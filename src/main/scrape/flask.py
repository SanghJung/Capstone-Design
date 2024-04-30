from flask import Flask, request
import json
from selenium import webdriver
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.common.exceptions import NoSuchWindowException
from urllib.parse import quote

app = Flask(__name__)

# 브라우저 꺼짐 방지
chrome_options = Options()
chrome_options.add_experimental_option("detach", True)

service = Service(executable_path=ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=chrome_options)

def scrape(place_name):
    try:
        driver.get("https://map.naver.com/v5/search/"+ place_name)
        time.sleep(3)
        driver.switch_to.frame('searchIframe') #  검색하고나서 가게정보창이 바로 안뜨는 경우 고려해서 무조건 맨위에 가게 링크 클릭하게 설정
        temp = driver.find_element(By.XPATH, '//*[@id="_pcmap_list_scroll_container"]/ul') # 메뉴표에 있는 텍스트 모두 들고옴(개발자 도구에서 그때그때 xpath 복사해서 들고오는게 좋다)
        button = temp.find_elements(By.TAG_NAME, 'a') # selenium에서 가끔씩 태그 시간내에 못찾는 경우 때문에 일부러 길게 설정해놓음

        if '이미지수' in button[0].text or button[0].text == '': # 가게 정보에 사진이 있는경우
            button[1].send_keys(Keys.ENTER)
        else: # 사진이 없는 경우
            button[0].send_keys(Keys.ENTER)

        time.sleep(3)
        driver.switch_to.default_content() # frame이 이상하게 넘어가는 경우 방지를 위해 원래 frame으로 변경한 후에 이동
        driver.switch_to.frame('entryIframe') # 메뉴정보가 entryIframe에 있기 때문에 frame 변경함

        # 메뉴 정보를 담을 리스트
        menu_list = []

        # 메뉴 정보 가져오기
        menu_ul = driver.find_element(By.CSS_SELECTOR, 'div.place_section_content > ul')
        menu_class = menu_ul.get_attribute("class")

        if menu_class == "jnwQZ":
            menu_items = driver.find_elements(By.CSS_SELECTOR, 'div.place_section_content > ul.jnwQZ > li')
            for item in menu_items:
                menu_name = item.find_element(By.CSS_SELECTOR, 'div:nth-child(1) > div > div > a').text
                menu_price = item.find_element(By.CSS_SELECTOR, 'div:nth-child(2) > em').text
                menu_list.append({"name": menu_name, "price": menu_price})

        elif menu_class == "t1osG":
            menu_items = driver.find_elements(By.CSS_SELECTOR, 'div.place_section_content > ul.t1osG > li')
            for item in menu_items:
                menu_name = item.find_element(By.CSS_SELECTOR, 'a > div:nth-child(2) > div:nth-child(1) > div > span').text
                menu_price = item.find_element(By.CSS_SELECTOR, 'a > div:nth-child(2) > div:nth-child(2) > div > em').text
                menu_list.append({"name": menu_name, "price": menu_price})

        else:
            print("메뉴가 없습니다:", menu_class)

        # 평점 리뷰 가져오기
        place_reviews = driver.find_elements(By.CSS_SELECTOR, 'div.dAsGb > span')
        place_rating = ""
        place_visitor_review = ""
        place_blog_review = ""

        if place_reviews:
            for review in place_reviews:
                str = review.text.split()
                if str[0] == "별점":
                    place_rating = str[1]
                if str[0] == "방문자리뷰":
                    place_visitor_review = str[1]
                elif str[0] == "블로그리뷰":
                    place_blog_review = str[1]

        # 결과를 JSON으로 반환
        result = {
            "rating": place_rating,
            "visitor_review": place_visitor_review,
            "blog_review": place_blog_review,
            "menus": menu_list
        }

        return json.dumps(result, ensure_ascii=False)

    except NoSuchWindowException as e:
        print("Window closed before interaction:", e)
        return json.dumps({"error": "Window closed before interaction"}, ensure_ascii=False)

#@app.route('/scrape', methods=['GET'])
@app.route('/')
def scrape_route():
    place_name = "바비레드 강남구"
    #place_name = request.args.get(place_name)
    json_data = scrape(place_name)
    return json_data

if __name__ == '__main__':
    app.run(debug=True)
