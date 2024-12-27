---
title: "大众点评爬虫教程"
description: ""
date: 2024-12-24T17:06:45-05:00
lastmod: 2024-12-24T17:06:45-05:00
categories:
tags:
draft: false
cover:
    image: "dzdp_spider.jpg"
    alt: "dzdp_spider"
    hidden: false
    hiddenInList: false
    hiddenInSingle: false
---



## 安装环境

```python
import time
import pandas as pd
from sqlalchemy import create_engine
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
```

## Step 1: 对浏览器进行设置

```python
chrome_options = Options()
chrome_options.add_argument('--incognito')  ##设置无痕模式
chrome_options.add_argument("--disable-blink-features=AutomationControlled")
service = Service('/Users/skg/Desktop/test/chromedriver')
driver = webdriver.Chrome(service=service, options=chrome_options)
script = '''
Object.defineProperty(navigator, 'webdriver', {
    get: () => undefined
})
'''
driver.execute_cdp_cmd("Page.addScriptToEvaluateOnNewDocument", {"source": script})
driver.maximize_window()
```

## Step 2: 设置定位xpath信息

```python
next_page_xp = "//div[@class='page']//a[@title='下一页']"
shop_lis_xp = "//div[@id='shop-all-list']//ul/li//div[@class='tit']/a"
shop_title_xp = "//h1[@class='shop-name']"
shop_score_xp = "//div[contains(@class,'score score')]"
shop_reviewcount_xp = "//span[@id='reviewCount']|//span[@class='reviews']"
shop_avgpricetitle_xp = "//span[@id='avgPriceTitle']|//span[@class='price']"
shop_kouwei_xp = "//span[contains(text(),'口味')]"
shop_huanjing_xp = "//span[contains(text(),'环境')]"
shop_fuwu_xp = "//span[contains(text(),'服务')]"
shop_adress_xp = "//span[@id='address']|//div[contains(text(),'地址')]"
shop_tel_xp = "//p[@class='expand-info tel']|//div[contains(text(),'电话')]"

reviews_block_xp = "//div[@class='reviews-items']/ul/li"
reviews_zhankai_xp = ".//a[@class='fold' and contains(@data-click-name,'展开评价')]"
reviews_body_xp = ".//div[@class='review-words']"
reviews_time_xp = ".//span[@class='time']"
reviews_nextpage_xp = "//div[@class='reviews-pages']//a[@class='NextPage']"
```

## Step 3: 参数设置

```python
# 登录页访问
driver.get("https://account.dianping.com/pclogin")
# 目标类目店铺列表页访问
driver.get("https://www.dianping.com/shanghai/ch10/g110")
## 设置抓取店铺列表页码数量
shop_lis_page_num = 2

## 设置抓取店铺评论列表页码数量
reviews_page_num = 10
```

## Step 4: 获取店铺主页链接

```python
shop_set = set()
for i in range(shop_lis_page_num):
    try:
        driver.find_element(By.XPATH,next_page_xp).click()
        time.sleep(2)
        shop_eles = driver.find_elements(By.XPATH,shop_lis_xp)
        for ele in shop_eles:
            shop_url = ele.get_attribute('href')
            if 'brands' in shop_url:
                continue
            shop_set.add(shop_url)
    except:
        pass
```

## Step 5: 循环访问店铺主页 并存储数据

```python
df_all = pd.DataFrame()
for li in shop_set:
    url = li + '/review_all'
    # 设置数据库链接
    conn = create_engine("mysql+pymysql://root:1711785634@localhost/test")
    try:
        driver.get(url)
        time.sleep(3)
    except:
        pass

    try:
        driver.find_element(By.XPATH,"//h1[contains(text(),'Forbidden')]")
        print("被限制")
        #driver.quit()
        break
    except:
        pass

    for rev_page in range(reviews_page_num):
        current_url = driver.current_url
        try:
            shop_title = driver.find_element(By.XPATH,shop_title_xp).get_attribute('textContent').strip().split(' ')[0].strip()
        except:
            shop_title = ''

        try:
            shop_score = driver.find_element(By.XPATH,shop_score_xp).get_attribute('textContent').strip()
        except:
            shop_score = ''

        try:
            shop_reviewcount = driver.find_element(By.XPATH,shop_reviewcount_xp).get_attribute('textContent').replace('条评价','').strip()
        except:
            shop_reviewcount = ''

        try:
            shop_avgpricetitle = driver.find_element(By.XPATH,shop_avgpricetitle_xp).get_attribute('textContent').replace('人均：','').replace('元','').strip()
        except:
            shop_avgpricetitle = ''

        try:
            shop_kouwei = driver.find_element(By.XPATH,shop_kouwei_xp).get_attribute('textContent').replace('口味：','').strip()
        except:
            shop_kouwei = ''

        try:
            shop_huanjing = driver.find_element(By.XPATH,shop_huanjing_xp).get_attribute('textContent').replace('环境：','').strip()
        except:
            shop_huanjing = ''

        try:
            shop_fuwu = driver.find_element(By.XPATH,shop_fuwu_xp).get_attribute('textContent').replace('服务：','').strip()
        except:
            shop_fuwu = ''

        try:
            shop_adress = driver.find_element(By.XPATH,shop_adress_xp).get_attribute('textContent').replace('地址:','').strip()
        except:
            shop_adress = ''

        try:
            shop_tel = driver.find_element(By.XPATH,shop_tel_xp).get_attribute('textContent').replace('电话:','').strip()
        except:
            shop_tel = ''

        reviews_block_eles = driver.find_elements(By.XPATH,reviews_block_xp)
        for reviews_ele in reviews_block_eles:
            try:
                reviews_ele.find_element(By.XPATH,reviews_zhankai_xp).click()
            except:
                pass
            time.sleep(0.5)
            try:
                reviews_body = reviews_ele.find_element(By.XPATH,reviews_body_xp).get_attribute('textContent').replace('收起评价','').strip()
            except:
                reviews_body = ''

            try:
                reviews_time = reviews_ele.find_element(By.XPATH,reviews_time_xp).get_attribute('textContent').strip().split('更新于')[0].strip()
            except:
                reviews_time = ''


            df = pd.DataFrame({"shop_url":[li],"shop_title":[shop_title],"shop_score":[shop_score],"shop_reviewcount":[shop_reviewcount],"shop_avgpricetitle":[shop_avgpricetitle],
                               "shop_kouwei":[shop_kouwei],"shop_huanjing":[shop_huanjing],"shop_fuwu":[shop_fuwu],"shop_adress":[shop_adress],"shop_tel":[shop_tel],
                               "reviews_body":[reviews_body],"reviews_time":[reviews_time],"current_url":[current_url]
                               })
            # 数据同步到mysql数据库
            df.to_sql(con=conn,name='dazdp_data',if_exists='append',index=False)

            ## 数据储存到pandas数据帧，结束后导出到excel
            df_all = pd.concat([df_all,df])
        try:
            driver.find_element(By.XPATH,reviews_nextpage_xp).click()
            time.sleep(1)
        except:
            pass
        time.sleep(1)
        try:
            driver.find_element(By.XPATH,"//h1[contains(text(),'Forbidden')]")
            print("被限制")
            #driver.quit()
            break
        except:
            pass
```

## Step 6: 导出为Excel

```python
df_all.to_excel("大众点评数据.xlsx",index=False)
```
