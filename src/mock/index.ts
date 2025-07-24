import { menulist, menulist2 } from './mockMenuList';
import Mock from 'mockjs';

Mock.setup({
  timeout: '200-900'
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