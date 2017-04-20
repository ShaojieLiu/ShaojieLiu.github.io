// setTimeout(() => location.reload(true), 500)

let e = sel => document.querySelector(sel)
let socket = io.connect()
let randName = function() {
  let nameList = '刀白凤,丁春秋,马夫人,马五德,小翠,于光豪,巴天石,不平道人,邓百川,风波恶,甘宝宝,公冶乾,木婉清,少林老僧,太皇太后,天狼子,天山童姥,王语嫣,乌老大,无崖子,云岛主,云中鹤,止清,白世镜,包不同,本参,本观,本相,本因,出尘子,冯阿三,古笃诚,过彦之,兰剑,平婆婆,石清露,石嫂,司空玄,司马林,玄慈,玄寂,玄苦,玄难,玄生,玄痛,叶二娘,左子穆,华赫艮,李春来,李傀儡,李秋水,刘竹庄,朴者和尚,祁六三,乔峰,全冠清,阮星竹,西夏宫女,许卓诚,朱丹臣,竹剑,阿碧,阿洪,阿胜,阿朱,阿紫,波罗星,陈孤雁,何望海,鸠摩智,来福儿,孟师叔,努儿海,宋长老,苏星河,苏辙,完颜阿古打,吴长风,吴光胜,吴领军,辛双清,严妈妈,余婆婆,岳老三,张全祥,单伯山,单季山,单叔山,单小山,单正,段延庆,段誉,段正淳,段正明,范禹,范百龄,范骅,苟读,郁光标,卓不凡,宗赞王子,哈大霸,姜师叔,枯荣长老,梦姑,神山上人,神音,狮鼻子,室里,项长老,姚伯当,幽草,赵钱孙,赵洵,哲罗星,钟灵,钟万仇,高升泰,龚光杰,贾老者,康广陵,秦红棉,容子矩,桑土公,唐光雄,奚长老,徐长老,诸保昆,崔百泉,崔绿华,符敏仪,黄眉和尚,菊剑,聋哑婆婆,梅剑,萧远山,虚竹,游骥,游驹,游坦之,程青霜,傅思归,葛光佩,缘根,智光大师,鲍千灵,褚万里,瑞婆婆,端木元,赫连铁树,黎夫人,慕容博,慕容复,谭公,谭婆,谭青,摘星子,慧方,慧观,慧净,慧真,穆贵妃,薛慕华,和里布,耶律洪基,耶律莫哥,耶律涅鲁古,耶律重元,易大彪,卜沉,丁坚,丁勉,上官云,万大平,于人豪,于嫂,不戒和尚,长青子,仇松年,丹青生,邓八公,方人智,方生,方证,风清扬,计无施,木高峰,天门道人,天松道人,天乙道人,王伯奋,王诚,王二叔,王夫人,王家驹,王家骏,王元霸,王仲强,白二,白熊,丛不弃,东方不败,乐厚,令狐冲,宁中则,平夫人,平一指,申人俊,史镖头,史登达,司马大,田伯光,仪和,仪琳,仪清,玉玑子,玉灵道人,玉磬子,玉音子,玉钟子,左冷禅,成不忧,成高道人,冲虚道长,吉人通,老不死,老头子,刘菁,刘芹,刘正风,米为义,农妇,齐堂主,曲非烟,曲洋,任我行,英颚,西宝,向大年,向问天,陈七,陈歪嘴,迟百诚,狄镖头,狄修,定静师太,杜长老,何三七,季镖头,劳德诺,陆伯,陆大有,任盈盈,沙天江,秃笔翁,吴柏英,吴天德,辛国梁,严三星,杨莲亭,余沧海,余人彦,岳灵珊,张夫人,张金鏊,定逸,建除,林平之,林远图,林震南,罗人杰,易国梓,易师爷,易堂主,英白罗,英长老,岳不群,郑镖头,郑萼,周孤桐,费彬,封不平,洪人雄,侯人英,觉月,施戴子,施令威,闻先生,哑婆婆,钟镇,祝镖头,祖千秋,高克新,高明根,贾布,贾人达,莫大,秦娟,秦伟帮,桑三娘,桃干仙,桃根仙,桃花仙,桃实仙,桃叶仙,梁发,绿竹翁,麻衣汉子,清虚道人,游迅,葛长老,黑白子,黑熊,桃枝仙,陶钧,夏老拳师,崔镖头,黄伯流,黄国柏,黄钟公, 鲁连荣,舒奇,童百熊,鲍大楚,解风,蓝凤凰,谭迪人,假东方不败,震山子'
  nameList = nameList.split(',')
  let len = nameList.length
  let rand = Math.floor(Math.random() * len)
  return nameList[rand]
}

let bind = function() {

  let sendMsg = function() {
    let t = e('.chat-textarea')
    let data = t.value
    socket.emit('newMsg', data)
    t.value = ''
  }

  e('.send').addEventListener('click', sendMsg)

  e('.chat-textarea').addEventListener('keyup', (ev) => {
    if (ev.key == 'Enter') {
      sendMsg()
    }
  })
}

let init = function() {

  let createName = function() {
    alertify.set({ labels: {
        ok     : "提交昵称",
        cancel : "随机来一个"
    } })
    alertify.prompt('输入你的昵称', function(bl, value) {
      if (!bl || value=='') {
        value = randName()
      }
      console.log(`昵称是:${value}`)
      socket.emit('newUsr', value)
    })
  }

  let status = function(obj) {
    let template = `
    <div class="tool status" id=${obj.id + 1}>
      <div class="usr-li">
        <div class="usr-li-icon">
          <img class="icon" src="${obj.src}" alt="">
        </div>
        <div class="usr-li-name">${obj.name}</div>
      </div>
    </div>
    `
    e('.chat-tool').insertAdjacentHTML('afterBegin', template)
  }

  let newTip = function(data) {
    let time = data.time
    let msg = data.msg
    let template = `
      <div class="chat-tip line2">
        <div class="chat-tip-time">${time}</div>
        <div class="chat-tip-msg">${msg}</div>
      </div>`
    e('.chat-area').insertAdjacentHTML('beforeend', template)
  }

  let newMsg = function(data) {
    let name = data.name
    let time = data.time
    let msg = data.msg
    let src = data.src
    let ele = e('.chat-area')
    let template = `
      <div class="chat-li">
        <div class="chat-li-icon">
          <img class="icon" src="${src}" alt="">
        </div>
        <div class="">
          <div class="chat-li-prop">
            <div class="chat-li-name">${name}</div>
            <div class="chat-li-time">${time}</div>
          </div>
          <div class="chat-li-msg rect">${msg}</div>
        </div>
      </div>`
    ele.insertAdjacentHTML('beforeend', template)
    ele.scrollTop = ele.scrollHeight
  }

  let newList = function(usrList) {
    let templateList = ''
    for (let prop of usrList) {
      let template = `
        <div class="usr-li" id="${prop.id}">
          <div class="usr-li-icon">
            <img class="icon" src="${prop.src}" alt="">
          </div>
          <div class="usr-li-name">${prop.name}</div>
        </div>`
      templateList += template
    }
    e('.usr-area').innerHTML = templateList
  }

  socket.on('connect', () => {console.log('连接成功')})

  socket.on('status', (obj) => {status(obj)})

  socket.on('newTip', (data) => {newTip(data)})

  socket.on('newMsg', (data) => {newMsg(data)})

  socket.on('newList', (data) => {newList(data)})

  window.onload = () => {
    createName()
  }
}
let __main = function() {
  bind()
  init()
}
__main()
