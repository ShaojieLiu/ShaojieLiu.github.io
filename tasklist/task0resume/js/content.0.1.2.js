var init = function () {
    var where = 'leftpart'
        addT1(where, 'book', '教 育 经 历', 'Education')
        addT2(where, 'graduation-cap', '2014~2017 <st>硕士</st>:华南师大(推免保送)')
        addT3(where, ['trophy','trophy','trophy','trophy'], [
            '2016年 3月~12月 <st>访问学者 - 美国</st>UCO大学',
            '2014年~2016年 连续两年 "<st>一等奖学金</st>"',
            '2016年 3月 美国<st>数学建模</st> "二等奖"',
            '2015年 11月 校级学术演讲比赛 "第一名"'
        ])
        addT2(where, 'graduation-cap', '2010~2014 本科:华南师大(国家 211)')
        addT3(where, ['trophy','trophy'], [
            '2012年 全国物理实验竞赛 "二等奖"',
            '2012年 广东物理设计大赛 "二等奖"'
        ])

        addT1(where, 'language', '语 言 水 平', 'Language')
        addT2(where, 'star', '英  语')
        addT3(where, ['check','check','check'], [
            '通过 CET-4, <st>CET-6</st>',
            '查阅英文技术文档, 开发者大会视频',
            '在<st>美国</st>生活一年, <b>邮件/口语</b> 交流无障碍'
        ])
        addT2(where, 'star', '中  文')
        addT3(where, ['check'], ['粤语 / 普通话 / 潮州话 / 闽南语'])

        addT1(where, 'thumbs-o-up', '自 我 评 价', 'Experience')
        addT3(where, ['star','star','star','star','star','star','star',], [
            '1. 丰富的编码实战经验, 热爱计算机编程;',
            '2. 有激情, 有创造力, 有逻辑性, 喜欢研究新技术\/新标准;',
            '3. 熟悉Node.js后台技术, 对前后端联合开发的技术原理有全面认识;',
            '4. 掌握 JS/ Ajax/ HTML5/ CSS3 等前端技术;',
            '5. 对 DNS / HTTP 和相关的其他底层网络协议有一定了解;',
            '6. 能实现各种网页产品的浏览器端和移动产品的各种 Web View 中的交互逻辑和业务逻辑的开发维护;',
            '7. 非常期待能与您共事, 谢谢'
        ])
        addT1(where, 'user-plus', '其 他 技 能', 'Experience')
        addT3(where, ['star','star','star','star','star','star','star',], [
            '掌握 Photoshop: 鼠绘 / 设计 / 修图 ',
            '熟悉 Cinema4D: 建模 / Aftereffect: 特效剪辑',
            'STM32 单片机 等硬件开发经验',
            '低音提琴 八级',
            '二胡 六级',
        ])

    where = 'rightpart'
        addT1(where, 'rocket', '前 端 经 验', 'Experience')
        addT2(where, 'newspaper-o', `简历生成器`, 'https://shaojieliu.github.io/tasklist/task0resume/resume.0.1.1.html')
            addT3(where, ['star','gear','gear','gears'], [
                '<st>自建框架</st>,生成预定样式的简历(本页面)',
                '语义化的 HTML 模块化的 CSS 实现<st>响应式布局</st>',
                '编写<st>JavaScript模块</st>生成html',
                '采用<st>canvas画布绘制</st>,实现"所见即所得"打印(请点击"打印PDF")',
            ])
        addT2(where, 'calendar-check-o', `ToDo 应用`, 'https://shaojieliu.github.io/tasklist/task2todo/todo.html')
            addT3(where, ['gear','gear','gear', 'gears'], [
                '使用<st> HTML5的localStorage </st>新特性实现本地数据存储',
                '利用<st> Ajax和JSON </st>实现前后端协同数据交互',
                '采用<st> Node.js </st>编写后端程序',
                '后端采用<st> Express框架 </st>和<st> fileSystem / bodyParser </st>组件实现与数据库的交互和读写'
            ])
        addT2(where, 'weibo', `微博评论页面`, '#')
            addT3(where, ['gear','gear','gear'], [
                '利用<st>Ajax</st>和<st>localStorage</st>实现与服务器和本地的数据通信',
                '基于<st>JavaScript</st>的逻辑校验和表单提交',
            ])
        addT2(where, 'volume-up', `音乐播放器`, '#')
            addT3(where, ['gear','gear','gear'], [
                '利用<st>Ajax</st>和<st>localStorage</st>实现与服务器和本地的数据通信',
                '基于<st>HTML5新标签audio</st>实现音乐播放器',
            ])
        addT2(where, 'calculator', `数字拼图 游戏`, '#')
            addT3(where, ['star','gear','gear'], [
                '基于<st>HTML5</st> 的单页面游戏应用',
                '<b>完美兼容</b> 桌面端和移动端',
                '纯粹使用<st>原生JS</st>开发'
            ])
        addT2(where, 'sign-in', `用户注册页面`, '#')
            addT3(where, ['star','gear','gear'], [
                '对用户输入内容的<st>实时监听/反馈</st>',
                '使用 jQuery 创建 逻辑校验和 <st>Ajax表单提交</st>',
            ])
        addT2(where, 'photo', `天猫轮播图`, 'https://shaojieliu.github.io/tasklist/task1carousel/carousel.html')
            addT3(where, ['gear','gear','gear'], [
                '利用<st> jQuery 面向对象 </st>开发轮播图组件',
                '基于<st> CSS3 </st>的新特性实现设计意图'
            ])
        addT2(where, 'home', `个人小站搭建`, 'http://119.29.169.60')
            addT3(where, ['gear','gear','gear','gears'], [
                '采用<st>腾讯云服务器</st>和<st>Apache</st>搭建个人小站',
                '基于<st>FTP协议</st>的站点维护',
            ])
}
