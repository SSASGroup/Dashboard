# 挣闲钱API文档

## 通过用户id更新用户余额
* 请求方式：POST
* URL: http://172.26.37.184:8080/MakeMoney/UserInq
* 参数：user_id, user_money, type=update
* 例
    - POST：  
    http://172.26.37.184:8080/MakeMoney/UserInq?user_id="333333"&type=update&user_money=3
    - 返回
    ```json
    {
      "code": "ok",
	  "msg": "成功",
	  "time": 1560299610753,
	  "items": null
    }
    ```
