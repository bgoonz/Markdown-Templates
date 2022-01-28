import sys
import os
import requests


def get_total_repos(group, name):
    repo_urls = []
    page = 1
    url = 'https://api.github.com/{0}/{1}/repos?per_page=100&page={2}'
    while True:
        r = requests.get(url.format(group, name, page))
        if r.status_code == 200:
            rdata = r.json()
            for repo in rdata:
                repo_urls.append(repo['clone_url'])
            if (len(rdata) >= 100):
                page += 1
            else:
                print('Found {0} repos.'.format(len(repo_urls)))
                break
        else:
            print(r)
            return False
    return repo_urls


def clone_repos(all_repos):
    print('Cloning...')
    for count, repo in enumerate(all_repos, start=1):
        os.system('Git clone ' + repo)
        print('Completed repo #{0} of {1}'.format(count, len(all_repos)))

if __name__ == '__main__':
    if len(sys.argv) > 2:
        if total := get_total_repos(sys.argv[1], sys.argv[2]):
            clone_repos(total)

    else:
        print('Usage: python USERS_OR_ORG GITHUB_USER_OR_ORG-NAME')
