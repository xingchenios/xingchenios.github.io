// 判题系统核心类
class JudgeSystem {
  constructor() {
    // 题目测试用例库
    this.testCases = {
      // 顺序表的取值
      'problem_3': {
        title: '顺序表的取值',
        difficulty: 'easy',
        passRate: 0.39,
        testCases: [
          {
            input: '5\n1 2 3 4 5\n3',
            output: '3'
          },
          {
            input: '6\n10 20 30 40 50 60\n5',
            output: '50'
          },
          {
            input: '3\n5 8 9\n1',
            output: '5'
          }
        ]
      },

      // 顺序表的查找
      'problem_4': {
        title: '顺序表的查找',
        difficulty: 'easy',
        pass