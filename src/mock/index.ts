import { menulist, menulist2 } from './mockMenuList';
import Mock from 'mockjs';

Mock.setup({
  timeout: '200-900'
})
Mock.mock('https://www.demo.com/api/get-device-sumary', 'get', () => {
  return {
      code: 200,
      message: 'success',
      data: {
        legend: ['设备总览'],
        category: [ '闲置数',  '报废数', '更换数', '维修数', '故障数', '使用数' ],
        record: [4200, 3000, 20000, 35000, 50000, 18000]
      }
    }
})
Mock.mock('https://www.demo.com/api/login', 'post', (options: any) => {
  
  const { loginName, loginPsw } = JSON.parse(options.body);
  console.log('options', loginName, loginPsw);
  if (loginName === 'admin' && loginPsw === 'admin123.') {
    return {
      code: 200,
      message: '登录成功',
      data: {
        token: 'DSADD12312dfsdfsTOCVKENSADA121FSDF',
        user: {
          username: '田广荣',
          role: ['admin']
        },
        menulist: menulist,
      }
    }
  } else if (loginName === 'user' && loginPsw === 'user123.') {
    return {
      code: 200,
      message: '登录成功',
      data: {
        token: 'DSADD12312dfsdfsTOCVKENSADA121FSDFTSDAS',
        user: {
          username: '田予安',
          role: ['user']
        },
        menulist: menulist2
      }
    }
  } else {
    return {
      code: 401,
      message: '用户名或密码错误',
      data: null,
    }
  }

})