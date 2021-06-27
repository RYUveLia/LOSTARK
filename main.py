import json
from operator import truediv

from fastapi import FastAPI, WebSocket
from fastapi import responses
from fastapi import templating, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

from typing import Dict, Optional
from pydantic import BaseModel

from fastapi.responses import JSONResponse
from pydantic import BaseModel
from urllib.parse import urlencode

import requests
from bs4 import BeautifulSoup

import imprint as imp

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory=".")

imprint_list = ["원한", "저주받은 인형", "기습의 대가", "슈퍼 차지", "잔재된 기운"]

acc_data = {
    "특성": {
        "head": "특성 선택",
        "body": ["치명", "특화", "신속"]
    }
}
stone_data = {
    "증가각인1": {
        "head": "증가각인 선택",
        "body": imprint_list
    },
    "증가수치1": {
        "head": "증가수치 선택",
        "body": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    "증가각인2": {
        "head": "증가각인 선택",
        "body": imprint_list
    },
    "증가수치2": {
        "head": "증가수치 선택",
        "body": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    "감소각인": {
        "head": "감소각인 선택",
        "body": ["공격력 감소", "공격속도 감소", "이동속도 감소", "방어력 감소"]
    },
    "감소수치": {
        "head": "감소수치 선택",
        "body": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
}
ring_data = {
    "각인": {
        "head": "각인 선택",
        "body": imprint_list
    },
    "활성도": {
        "head": "활성도 선택",
        "body": [0, 3, 6, 9, 12]
    }    
}
object_data = {
    "목표각인": {
        "head": "목표각인 선택",
        "body": imprint_list
    }
}

@app.get("/", response_class=HTMLResponse)
def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request, "acc_data": acc_data, "stone_data": stone_data, "ring_data": ring_data, "object_data": object_data})

@app.get("/lostark")
def lark():
    return {"main": "lostark"}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        data_dict = json.loads(data)
        
        imp.init(data_dict)
        
        await websocket.send_text(f"Message text was: {data}")


@app.post("/items/")
async def get_acc(request_body: Dict):
    # 경매장에서 get

    header = {'Content-Type': 'application/json'}
    res = requests.post("https://lostark.game.onstove.com/Auction/GetAuctionListV2/", data=json.dumps(request_body), headers=header)

    #print(res.text)

    # get한 값을 파싱해서 조합하기
    soup = BeautifulSoup(res.text, 'html.parser')

    alist = soup.select('#auctionListTbody > tr')

    for i in range(1, len(alist) + 1):
        item_name = soup.select('#auctionListTbody > tr:nth-child(' + str(i) + ') > td:nth-child(1) > div.grade > span.name')
        item_attr = soup.select('#auctionListTbody > tr:nth-child(' + str(i) + ') > td:nth-child(1) > div.effect > ul')
        item_price = soup.select('#auctionListTbody > tr:nth-child(' + str(i) + ') > td:nth-child(6) > div > em')

        print(item_name[0].text.strip())
        for j in item_attr:
            print(j.text.strip())
        print(item_price[0].text.strip())
    #print(len(alist))
    
    #string1 = json.dumps(alist)
    

    # 리턴값 = 악세서리 조합
    #return alist
# async def create_item(item: Item):
#     item_dict = item.dict()
#     if item.tax:
#         price_with_tax = item.price + item.tax
#         item_dict.update({"price_with_tax": price_with_tax})
#     return item_dict 


# formRequest_body = {
#     "request": {
#         "firstCategory": 200000,
#         "secondCategory": 200010,
#         "classNo": None,
#         "itemTier": 3,
#         "itemGrade": 5,
#         "itemLevelMin": 0,
#         "itemLevelMax": 1500,
#         "itemName": None,
#         "gradeQuality": None,
#         "skillOptionList": [
#             {
#                 "firstOption": None,
#                 "secondOption": None,
#                 "minValue": None,
#                 "maxValue": None
#             },
#             {
#                 "firstOption": None,
#                 "secondOption": None,
#                 "minValue": None,
#                 "maxValue": None
#             },
#             {
#                 "firstOption": None,
#                 "secondOption": None,
#                 "minValue": None,
#                 "maxValue": None
#             }
#         ],
#         "etcOptionList": [
#             {
#                 "firstOption": None,
#                 "secondOption": None,
#                 "minValue": None,
#                 "maxValue": None
#             },
#             {
#                 "firstOption": None,
#                 "secondOption": None,
#                 "minValue": None,
#                 "maxValue": None
#             },
#             {
#                 "firstOption": None,
#                 "secondOption": None,
#                 "minValue": None,
#                 "maxValue": None
#             },
#             {
#                 "firstOption": None,
#                 "secondOption": None,
#                 "minValue": None,
#                 "maxValue": None
#             }
#         ],
#         "pageNo": 1,
#         "sortOption": {
#             "Sort": "BIDSTART_PRICE",
#             "IsDesc": "false"
#         }
#     },
#     "tooltipData": None
# }