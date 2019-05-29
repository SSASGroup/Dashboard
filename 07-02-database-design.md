# [](#TOC)数据库设计


## 物理模型
- User

  | Field         | Type        | Key  | Description          |
  | ------------- | ----------- | ---- | -------------------- |
  | user_id   |    varchar(20)      | PRI  | The ID of user   |
  | user_name | varchar(20) |      | The name of user |
  | user_password | varchar(20) |      | The password of user |
  | user_money | int |      | The money of user |

- questionnaire_question

  | Field         | Type        | Key  | Description          |
  | ------------- | ----------- | ---- | -------------------- |
  | publisher_id   |    varchar(20)      | PRI  | The ID of publisher   |
  | publisher_name | varchar(20) |      | The name of publisher |
  | title | varchar(20) |   PRI   | The title of questionnaire |
  | price | int |      | The price of answering |
  | description | varchar(20) |      | The description of questionnaire |
  | question_1 | varchar(100) |      | The question of questionnaire |
  | question_2 | varchar(100) |      | The question of questionnaire |
  | question_3 | varchar(100) |      | The question of questionnaire |
  | question_4 | varchar(100) |      | The question of questionnaire |
  | question_5 | varchar(100) |      | The question of questionnaire |

- questionnaire_answer

  | Field         | Type        | Key  | Description          |
  | ------------- | ----------- | ---- | -------------------- |
  | publisher_id   |    varchar(20)      | PRI  | The ID of publisher   |
  | publisher_name | varchar(20) |      | The name of publisher |
  | answerer_id   |    varchar(20)      | PRI  | The ID of answerer   |
  | answerer_name | varchar(20) |      | The name of answerer |
  | title | varchar(20) |   PRI   | The title of questionnaire |
  | price | int |      | The price of answering |
  | description | varchar(20) |      | The description of questionnaire |
  | answer_1 | varchar(100) |      | The answer of questionnaire |
  | answer_2 | varchar(100) |      | The answer of questionnaire |
  | answer_3 | varchar(100) |      | The answer of questionnaire |
  | answer_4 | varchar(100) |      | The answer of questionnaire |
  | answer_5 | varchar(100) |      | The answer of questionnaire |


- resume_question

  | Field         | Type        | Key  | Description          |
  | ------------- | ----------- | ---- | -------------------- |
  | publisher_id   |    varchar(20)      | PRI  | The ID of publisher   |
  | publisher_name | varchar(20) |      | The name of publisher |
  | title | varchar(20) |   PRI   | The title of resume |
  | price | int |      | The price of answering |
  | description | varchar(20) |      | The description of resume |

- resume_answer

  | Field         | Type        | Key  | Description          |
  | ------------- | ----------- | ---- | -------------------- |
  | publisher_id   |    varchar(20)      | PRI  | The ID of publisher   |
  | publisher_name | varchar(20) |      | The name of publisher |
  | answerer_id   |    varchar(20)      | PRI  | The ID of answerer   |
  | answerer_name | varchar(20) |      | The name of answerer |
  | title | varchar(20) |   PRI   | The title of resume |
  | price | int |      | The price of answering |
  | description | varchar(20) |      | The description of resume |
  | answer_1 | varchar(100) |      | The answer of questionnaire |
  | answer_2 | varchar(100) |      | The answer of questionnaire |
  | answer_3 | varchar(100) |      | The answer of questionnaire |
  | answer_4 | varchar(100) |      | The answer of questionnaire |
  | answer_5 | varchar(100) |      | The answer of questionnaire |