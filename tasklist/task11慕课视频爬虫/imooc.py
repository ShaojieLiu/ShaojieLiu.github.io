import requests
from lxml import html
import itertools
import json


def log(*args):
    print(args)


def video_from_item(item):
    link = item.xpath('./a[@class="J-media-item"]')
    link = link[0]
    title = link.text_content()
    title = title.strip().split('\r\n')[0].strip()
    # formatted_title = t[0].strip() + t[1].strip()
    path = link.attrib['href']
    return title, path


def item_from_chapter(chapter):
    item = chapter.xpath('./ul[@class="video"]/li')
    video = [video_from_item(i) for i in item]
    return video


def chapter_from_node(node):
    chapter = node.xpath('./div[@class="chapter "]')
    video_path = [item_from_chapter(c) for c in chapter]
    return video_path


base_path = 'http://www.imooc.com'
cookies = ''
useragent = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36'
headers = {
    'Cookie': cookies,
    'User-Agent': useragent,
}


def save_video(title, video):
    r = requests.get(video)
    log('debug r', r)
    file = 'video_time/{}.mp4'.format(title)
    log('debug file', file)
    with open(file, 'wb') as f:
        f.write(r.content)


def video_by_id(id):
    url = 'http://www.imooc.com/course/ajaxmediainfo/?mid={}'.format(id)
    r = requests.get(url, headers=headers)
    data = json.loads(r.text)
    video = data['data']['result']['mpath'][2]
    return video


def mooc():
    url = 'http://www.imooc.com/learn/588'
    r = requests.get(url)
    root = html.fromstring(r.text)
    chapter_list = root.xpath('//div[@class="mod-chapters"]')
    chapter = chapter_from_node(chapter_list[0])
    video_path_list = list(itertools.chain.from_iterable(chapter))
    for v in video_path_list:
        title = v[0]
        log(title)
        id = v[1].split('/')[2]
        video = video_by_id(id)
        save_video(title, video)


def main():
    mooc()


if __name__ == '__main__':
    main()
