from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from datetime import datetime, timedelta
from collections import defaultdict
import os

app = Flask(__name__)
CORS(app)

# GitHub API base URL
GITHUB_API_URL = "https://api.github.com"

class GitHubProfileExtractor:
    def __init__(self, username):
        self.username = username
        self.headers = {
            "Accept": "application/vnd.github.v3+json"
        }
        # GitHub token varsa ekleyin (rate limit için)
        github_token = os.environ.get('GITHUB_TOKEN')
        if github_token:
            self.headers['Authorization'] = f'token {github_token}'
    
    def get_user_info(self):
        """Kullanıcının temel bilgilerini al"""
        try:
            url = f"{GITHUB_API_URL}/users/{self.username}"
            print(f"Fetching user info from: {url}")  # Debug
            response = requests.get(url, headers=self.headers)
            print(f"Response status: {response.status_code}")  # Debug
            
            if response.status_code == 403:
                # Rate limit kontrolü
                reset_time = response.headers.get('X-RateLimit-Reset', '')
                if reset_time:
                    from datetime import datetime
                    reset_dt = datetime.fromtimestamp(int(reset_time))
                    print(f"Rate limit aşıldı. Reset zamanı: {reset_dt}")
                return None
            
            response.raise_for_status()
            data = response.json()
            print(f"User found: {data.get('login')}")  # Debug
            return data
        except requests.exceptions.RequestException as e:
            print(f"Error fetching user info: {e}")  # Debug
            return None
    
    def get_user_repos(self):
        """Kullanıcının repository'lerini al"""
        try:
            all_repos = []
            page = 1
            while len(all_repos) < 100:  # Maksimum 100 repo
                response = requests.get(
                    f"{GITHUB_API_URL}/users/{self.username}/repos",
                    headers=self.headers,
                    params={'per_page': 100, 'page': page, 'sort': 'updated'}
                )
                response.raise_for_status()
                repos = response.json()
                if not repos:
                    break
                all_repos.extend(repos)
                if len(repos) < 100:
                    break
                page += 1
            return all_repos
        except requests.exceptions.RequestException as e:
            return []
    
    def get_user_events(self):
        """Kullanıcının son aktivitelerini al"""
        try:
            all_events = []
            page = 1
            while len(all_events) < 300:  # Son 300 event
                response = requests.get(
                    f"{GITHUB_API_URL}/users/{self.username}/events/public",
                    headers=self.headers,
                    params={'per_page': 100, 'page': page}
                )
                response.raise_for_status()
                events = response.json()
                if not events:
                    break
                all_events.extend(events)
                if len(events) < 100:
                    break
                page += 1
            return all_events
        except requests.exceptions.RequestException as e:
            return []
    
    def get_user_gists(self):
        """Kullanıcının gist'lerini al"""
        try:
            response = requests.get(
                f"{GITHUB_API_URL}/users/{self.username}/gists",
                headers=self.headers,
                params={'per_page': 100}
            )
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            return []
    
    def get_user_orgs(self):
        """Kullanıcının organizasyonlarını al"""
        try:
            response = requests.get(
                f"{GITHUB_API_URL}/users/{self.username}/orgs",
                headers=self.headers
            )
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            return []
    
    def get_user_starred(self):
        """Kullanıcının yıldızladığı repo sayısını al"""
        try:
            response = requests.get(
                f"{GITHUB_API_URL}/users/{self.username}/starred",
                headers=self.headers,
                params={'per_page': 1}
            )
            response.raise_for_status()
            # Link header'dan toplam sayıyı al
            link_header = response.headers.get('Link', '')
            if 'last' in link_header:
                import re
                match = re.search(r'page=(\d+)>; rel="last"', link_header)
                if match:
                    return int(match.group(1))
            return len(response.json())
        except requests.exceptions.RequestException as e:
            return 0
    
    def analyze_languages(self, repos):
        """Repository'lerden programlama dillerini analiz et"""
        languages = {}
        language_bytes = {}
        
        for repo in repos:
            if repo.get('language'):
                lang = repo['language']
                languages[lang] = languages.get(lang, 0) + 1
                # Repo boyutunu da hesaba kat
                size = repo.get('size', 0)
                language_bytes[lang] = language_bytes.get(lang, 0) + size
        
        # En çok kullanılandan aza sırala
        sorted_languages = sorted(languages.items(), key=lambda x: x[1], reverse=True)
        return [
            {
                'language': lang, 
                'count': count,
                'size': language_bytes.get(lang, 0)
            } 
            for lang, count in sorted_languages
        ]
    
    def analyze_contributions(self, events):
        """Contribution geçmişini analiz et"""
        contribution_stats = {
            'PushEvent': 0,
            'PullRequestEvent': 0,
            'IssuesEvent': 0,
            'CreateEvent': 0,
            'ForkEvent': 0,
            'WatchEvent': 0,
            'total_commits': 0,
            'total_prs': 0,
            'total_issues': 0,
            'total_reviews': 0
        }
        
        recent_activities = []
        daily_contributions = defaultdict(int)
        
        for event in events:
            event_type = event.get('type')
            if event_type in contribution_stats:
                contribution_stats[event_type] += 1
            
            if event_type == 'PushEvent':
                commits = event.get('payload', {}).get('commits', [])
                contribution_stats['total_commits'] += len(commits)
            elif event_type == 'PullRequestEvent':
                contribution_stats['total_prs'] += 1
            elif event_type == 'IssuesEvent':
                contribution_stats['total_issues'] += 1
            elif event_type == 'PullRequestReviewEvent':
                contribution_stats['total_reviews'] += 1
            
            # Günlük contribution sayısı
            created_at = event.get('created_at', '')
            if created_at:
                date = created_at.split('T')[0]
                daily_contributions[date] += 1
        
        # Son aktiviteleri ekle
        for event in events[:20]:
            recent_activities.append({
                'type': event.get('type'),
                'repo': event.get('repo', {}).get('name', ''),
                'created_at': event.get('created_at', ''),
                'payload': self._extract_event_payload(event)
            })
        
        # Contribution streak hesapla
        streak = self._calculate_streak(daily_contributions)
        
        return {
            'stats': contribution_stats,
            'recent_activities': recent_activities,
            'daily_contributions': dict(daily_contributions),
            'streak': streak,
            'total_days_active': len(daily_contributions)
        }
    
    def _extract_event_payload(self, event):
        """Event payload'dan önemli bilgileri çıkar"""
        event_type = event.get('type')
        payload = event.get('payload', {})
        
        if event_type == 'PushEvent':
            return {'commits': len(payload.get('commits', []))}
        elif event_type == 'PullRequestEvent':
            pr = payload.get('pull_request', {})
            return {
                'action': payload.get('action'),
                'title': pr.get('title', '')[:50]
            }
        elif event_type == 'IssuesEvent':
            issue = payload.get('issue', {})
            return {
                'action': payload.get('action'),
                'title': issue.get('title', '')[:50]
            }
        return {}
    
    def _calculate_streak(self, daily_contributions):
        """Contribution streak hesapla"""
        if not daily_contributions:
            return {'current': 0, 'longest': 0}
        
        dates = sorted(daily_contributions.keys(), reverse=True)
        current_streak = 0
        longest_streak = 0
        temp_streak = 0
        
        # Current streak
        today = datetime.now().date()
        for i, date_str in enumerate(dates):
            date = datetime.strptime(date_str, '%Y-%m-%d').date()
            expected_date = today - timedelta(days=i)
            
            if date == expected_date:
                current_streak += 1
            else:
                break
        
        # Longest streak
        prev_date = None
        for date_str in sorted(daily_contributions.keys()):
            date = datetime.strptime(date_str, '%Y-%m-%d').date()
            
            if prev_date is None:
                temp_streak = 1
            elif (date - prev_date).days == 1:
                temp_streak += 1
            else:
                longest_streak = max(longest_streak, temp_streak)
                temp_streak = 1
            
            prev_date = date
        
        longest_streak = max(longest_streak, temp_streak)
        
        return {
            'current': current_streak,
            'longest': longest_streak
        }
    
    def extract_social_links(self, user_info):
        """Sosyal medya linklerini çıkar"""
        social_links = {}
        
        if user_info.get('blog'):
            social_links['website'] = user_info['blog']
        
        if user_info.get('twitter_username'):
            social_links['twitter'] = f"https://twitter.com/{user_info['twitter_username']}"
        
        if user_info.get('email'):
            social_links['email'] = user_info['email']
        
        social_links['github'] = user_info.get('html_url', '')
        
        return social_links
    
    def generate_profile_summary(self):
        """Tüm bilgileri toplayıp özet oluştur"""
        user_info = self.get_user_info()
        
        if not user_info:
            return None
        
        repos = self.get_user_repos()
        events = self.get_user_events()
        gists = self.get_user_gists()
        orgs = self.get_user_orgs()
        starred_count = self.get_user_starred()
        
        languages = self.analyze_languages(repos)
        contributions = self.analyze_contributions(events)
        social_links = self.extract_social_links(user_info)
        
        # Repository istatistikleri
        total_stars = sum(repo.get('stargazers_count', 0) for repo in repos)
        total_forks = sum(repo.get('forks_count', 0) for repo in repos)
        total_watchers = sum(repo.get('watchers_count', 0) for repo in repos)
        total_size = sum(repo.get('size', 0) for repo in repos)
        
        # Repo tipleri
        public_repos = len([r for r in repos if not r.get('private', False)])
        forked_repos = len([r for r in repos if r.get('fork', False)])
        original_repos = public_repos - forked_repos
        
        # En çok kullanılan lisans
        licenses = {}
        for repo in repos:
            license_info = repo.get('license')
            if license_info and license_info.get('name'):
                lic = license_info['name']
                licenses[lic] = licenses.get(lic, 0) + 1
        
        # Repo yaşları ve aktivite
        repo_ages = []
        last_updated = []
        for repo in repos:
            if repo.get('created_at'):
                created = datetime.strptime(repo['created_at'], '%Y-%m-%dT%H:%M:%SZ')
                age_days = (datetime.now() - created).days
                repo_ages.append(age_days)
            if repo.get('updated_at'):
                updated = datetime.strptime(repo['updated_at'], '%Y-%m-%dT%H:%M:%SZ')
                last_updated.append(updated)
        
        avg_repo_age = sum(repo_ages) / len(repo_ages) if repo_ages else 0
        most_recent_update = max(last_updated) if last_updated else None
        
        # Gist istatistikleri
        public_gists = len(gists)
        gist_stars = sum(gist.get('stargazers_count', 0) for gist in gists)
        
        summary = {
            'personal_info': {
                'name': user_info.get('name', self.username),
                'username': self.username,
                'bio': user_info.get('bio', ''),
                'location': user_info.get('location', ''),
                'company': user_info.get('company', ''),
                'avatar_url': user_info.get('avatar_url', ''),
                'created_at': user_info.get('created_at', ''),
                'hireable': user_info.get('hireable', False),
                'public_gists': user_info.get('public_gists', 0)
            },
            'social_links': social_links,
            'statistics': {
                'public_repos': public_repos,
                'original_repos': original_repos,
                'forked_repos': forked_repos,
                'followers': user_info.get('followers', 0),
                'following': user_info.get('following', 0),
                'total_stars': total_stars,
                'total_forks': total_forks,
                'total_watchers': total_watchers,
                'total_size_kb': total_size,
                'public_gists': public_gists,
                'gist_stars': gist_stars,
                'starred_repos': starred_count,
                'avg_repo_age_days': int(avg_repo_age),
                'most_recent_update': most_recent_update.isoformat() if most_recent_update else None
            },
            'languages': languages[:15],
            'contributions': contributions,
            'organizations': [
                {
                    'name': org.get('login'),
                    'avatar': org.get('avatar_url'),
                    'url': f"https://github.com/{org.get('login')}"
                }
                for org in orgs[:10]
            ],
            'top_licenses': sorted(licenses.items(), key=lambda x: x[1], reverse=True)[:5],
            'top_repositories': [
                {
                    'name': repo.get('name', ''),
                    'description': repo.get('description', ''),
                    'stars': repo.get('stargazers_count', 0),
                    'forks': repo.get('forks_count', 0),
                    'watchers': repo.get('watchers_count', 0),
                    'language': repo.get('language', ''),
                    'url': repo.get('html_url', ''),
                    'homepage': repo.get('homepage', ''),
                    'topics': repo.get('topics', []),
                    'created_at': repo.get('created_at', ''),
                    'updated_at': repo.get('updated_at', ''),
                    'size': repo.get('size', 0),
                    'open_issues': repo.get('open_issues_count', 0),
                    'license': repo.get('license', {}).get('name', '') if repo.get('license') else '',
                    'is_fork': repo.get('fork', False),
                    'default_branch': repo.get('default_branch', 'main')
                }
                for repo in sorted(repos, key=lambda x: x.get('stargazers_count', 0), reverse=True)[:10]
            ],
            'recent_repos': [
                {
                    'name': repo.get('name', ''),
                    'description': repo.get('description', ''),
                    'language': repo.get('language', ''),
                    'updated_at': repo.get('updated_at', ''),
                    'url': repo.get('html_url', '')
                }
                for repo in sorted(repos, key=lambda x: x.get('updated_at', ''), reverse=True)[:5]
            ],
            'top_gists': [
                {
                    'description': gist.get('description', 'No description'),
                    'files': list(gist.get('files', {}).keys()),
                    'public': gist.get('public', True),
                    'url': gist.get('html_url', ''),
                    'created_at': gist.get('created_at', '')
                }
                for gist in sorted(gists, key=lambda x: x.get('created_at', ''), reverse=True)[:3]
            ]
        }
        
        return summary

@app.route('/api/profile/<username>', methods=['GET'])
def get_profile(username):
    """GitHub kullanıcı profilini al ve özet oluştur"""
    try:
        extractor = GitHubProfileExtractor(username)
        summary = extractor.generate_profile_summary()
        
        if summary is None:
            # Rate limit kontrolü
            try:
                test_response = requests.get(
                    f"{GITHUB_API_URL}/rate_limit",
                    headers=extractor.headers
                )
                if test_response.status_code == 200:
                    rate_data = test_response.json()
                    remaining = rate_data.get('rate', {}).get('remaining', 0)
                    if remaining == 0:
                        reset_time = rate_data.get('rate', {}).get('reset', 0)
                        from datetime import datetime
                        reset_dt = datetime.fromtimestamp(reset_time)
                        return jsonify({
                            'error': f'GitHub API rate limit aşıldı. Reset zamanı: {reset_dt.strftime("%H:%M:%S")}'
                        }), 429
            except:
                pass
            
            return jsonify({'error': 'Kullanıcı bulunamadı veya GitHub API hatası'}), 404
        
        return jsonify(summary), 200
    
    except Exception as e:
        print(f"Error: {str(e)}")  # Debug için
        import traceback
        traceback.print_exc()  # Stack trace yazdır
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """API sağlık kontrolü"""
    return jsonify({'status': 'healthy'}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
