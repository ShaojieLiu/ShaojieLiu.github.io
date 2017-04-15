
let e = sel => document.querySelector(sel)
let es = sel => document.querySelectorAll(sel)

let game = function() {

  let maxNum = 4

  let matrix0 = function(num, n, m) {
    let result = []
    for (let i = 0; i < n; i++) {
      let temp = []
      for (let j = 0; j < m; j++) {
        temp.push(num)
      }
      result.push(temp)
    }
    return result
  }

  this.arr = []
  this.zoom = []
  this.path = []
  this.score = 0
  if (window.localStorage.highest) {this.highest = window.localStorage.highest}
  else {this.highest = 0}

  let bindDirection = function() {

    let del0 = function(arr, zoomRow) {
      // console.log('del0', arr, zoomRow)
      let j = 0, newArr = [], newZoom = []
      for (var i = 0; i < arr.length; i++) {
        if (arr[i]) {
          newArr[j] = arr[i]
          newZoom[j] = zoomRow[i]
          j++
        }
      }
      for (; j < arr.length; j++) {
        newArr[j] = 0
        newZoom[j] = 0
      }
      arr = newArr
      zoomRow = newZoom
      return [newArr, newZoom]
    }

    let merge = function(arr, zoomRow) {
      // console.log('merge', arr, zoomRow)
      var newArr = arr, newZoom = []
      for (var i = 0; i < arr.length - 1; i++) {
        if (arr[i] == arr[i + 1] && arr[i] != 0) {
          score += pow2(newArr[i])
          if (score > highest) {
            highest = score
            window.localStorage.highest = highest
          }
          console.log('新分数', score, highest)
          newArr[i] = arr[i] + 1
          newArr[i + 1] = 0
          newZoom[i] = 1
        } else {
          newZoom[i] = 0
        }
      }
      newZoom.push(0)
      arr = newArr
      zoomRow = newZoom
      return [newArr, newZoom]
    }

    let operation = function(arr, zoomRow) {
      let a, b, c, d, e, f
      [a, b] = del0(arr, zoomRow)
      // console.log('a,b', a, b)
      let temp = merge(a, b)
      c = temp[0]
      d = temp[1]
      // console.log('c,d', c, d)
      temp = del0(c, d)
      e = temp[0]
      f = temp[1]
      // console.log('e,f', e, f)
      return [e, f]
    }

    let up = function() {
      // console.log('up')
      for (let i = 0; i < arr.length; i++) {
        let newRow = [],
            len = arr[0].length
        for (let j = 0; j < len; j++) {
          newRow.push(arr[j][i])
        }
        [newRow, zoomRow] = operation(newRow, [0,0,0,0])
        for (let j = 0; j < len; j++) {
          arr[j][i] = newRow[j]
          zoom[j][i] = zoomRow[j]
        }
      }
    }

    let down = function() {
      // console.log('down')
      for (let i = 0; i < arr.length; i++) {
        let newRow = [],
            len = arr[0].length
        for (let j = len - 1; j >= 0; j--) {
          newRow.push(arr[j][i])
        }
        [newRow, zoomRow] = operation(newRow, [0,0,0,0])
        for (let j = 0; j < len; j++) {
          arr[len - 1 - j][i] = newRow[j]
          zoom[len - 1 - j][i] = zoomRow[j]
        }
      }
    }

    let left = function() {
      // console.log('left')
      for (let i = 0; i < arr.length; i++) {
        let newRow = [],
            len = arr[0].length
        for (let j = 0; j < len; j++) {
          newRow.push(arr[i][j])
        }
        [newRow, zoomRow] = operation(newRow, [0,0,0,0])
        for (let j = 0; j < len; j++) {
          arr[i][j] = newRow[j]
          zoom[i][j] = zoomRow[j]
        }
      }
    }

    let right = function() {
      // console.log('right')
      for (let i = 0; i < arr.length; i++) {
        let newRow = [],
            len = arr[0].length
        for (let j = len - 1; j >= 0; j--) {
          newRow.push(arr[i][j])
        }
        [newRow, zoomRow] = operation(newRow, [0,0,0,0])
        for (let j = 0; j < len; j++) {
          arr[i][len - 1 - j] = newRow[j]
          zoom[i][len - 1 - j] = zoomRow[j]
        }
      }
    }

    let op = function() {
      // console.log(`arr \n ${JSON.stringify(arr)} \npath \n ${JSON.stringify(path.slice(-1)[0].arr)}`)
      if (JSON.stringify(arr) != JSON.stringify(path.slice(-1)[0].arr)) {
        arr = randNum(arr, 1)
        addPath(arr, zoom, score)
        rend(arr, zoom, score)
      } else {
        console.log('无效步')
      }
    }

    let bindKeybord = function(keyList, funList) {
      e('html').addEventListener('keyup', function(ev) {
        for (let prop in keyList) {
          if (ev.key == keyList[prop]) {
            funList[prop]()
            op()
          }
        }
      })
    }

    let bindSwipe = function(swipeList, funList) {
      let mc = new Hammer(e('mainCont'))
      mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
      for (let swipeEvent of swipeList) {
        mc.on(swipeEvent, function(ev) {
          console.log(ev)
          for (let prop in swipeList) {
            if (ev.type == swipeList[prop]) {
              funList[prop]()
              op()
            }
          }
        })
      }
    }

    let keyList = ['w', 's', 'a', 'd']
    let funList = [up, down, left, right]
    bindKeybord(keyList, funList)
    let swipeList = ['swipeup', 'swipedown', 'swipeleft', 'swiperight']
    bindSwipe(swipeList, funList)
  }

  let addPath = function(arr, zoom, score) {
    path.push({
      arr: JSON.parse(JSON.stringify(arr)),
      zoom: JSON.parse(JSON.stringify(zoom)),
      score: score
    })
    // console.log(path)
  }

  // 在 arr 里的空白处产生 num 个随机的 1 或者 2
  let randNum = function(arr, num) {
    if (num == 0) {
      return arr
    } else {
      let row = Math.floor(Math.random() * maxNum)
      let col = Math.floor(Math.random() * maxNum)
      if (arr[row][col] == 0) {
        let maxRand = 2
        let rand = Math.floor(Math.random() * maxRand) + 1
        // console.log(`随机的行列：${row}, ${col}; 数字：${rand}`)
        arr[row][col] = rand
        zoom[row][col] = -1
        return randNum(arr, --num)
      } else{
        return randNum(arr, num)
      }
    }
  }

  // 把单独一个数转为 2 的次方， 或者 0 或 空
  let pow2 = function(num) {
    if (num == 0) {
      return 0
    } else {
      return Math.pow(2, num)
    }
  }

  // 千位空格
  let thousand = function(num) {
    return num && num.toString().replace(/(?=(?!^)(\d{3})+$)/g, ',')
  }

  let rend = function(arr, zoom, score) {
    let view = e('.view'),
        viewHTML = ''

    for (var i = 0; i < arr.length; i++) {
      let arrRow = arr[i],
          rowHTML = '',
          rowStart = `<div class="row row-${i}">`
          rowEnd = `</div>`

      for (var j = 0; j < arrRow.length; j++) {
        let spanHTML = `<div class="card col-${j} num${arrRow[j]}">${pow2(arrRow[j])}</div>`
        rowHTML += spanHTML
      }

      rowHTML = rowStart + rowHTML + rowEnd
      viewHTML += rowHTML
    }
    e('.count-area').innerHTML = `
      <span class="count count-now"> 得分<br>${thousand(score)} </span>
      <span class="count count-highest"> 最高<br>${thousand(highest)} </span>`

    view.innerHTML = viewHTML

    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr[0].length; j++) {
        if (zoom[i][j] == -1) {
          e(`.row-${i} .col-${j}`).classList.add('card-zoomOut')
        } else if (zoom[i][j] == 1) {
          e(`.row-${i} .col-${j}`).classList.add('card-zoomIn')
        }
      }
    }
    zoom = matrix0(0, 4, 4)
  }

  let bindNew = function() {
    e('.btn-new').addEventListener('click', function() {
      alertify.confirm('放下一切，重新开始？', function(ev) {
        if (ev) {__init()}
        else {}
      })
    })
  }

  let bindRegret = function() {
    e('.btn-prev').addEventListener('click', function() {
      if (path.length > 1) {
        path.splice(-1, 1)
        let prev = path.slice(-1)[0]
        arr = JSON.parse(JSON.stringify(prev.arr))
        zoom = JSON.parse(JSON.stringify(prev.zoom))
        score = prev.score
        rend(arr, zoom, score)
      }
    })
  }

  let bindAll = function() {
    bindDirection()
    bindRegret()
    bindNew()
  }

  let __init = function() {
    arr = matrix0(0, maxNum, maxNum)
    zoom = matrix0(0, maxNum, maxNum)
    arr = randNum(arr, 2)
    path = []
    addPath(arr, zoom, score)
    score = 0
    rend(arr, zoom, score)
  }

  let testColor = function() {
    let result = []
    for (let i = 0; i < maxNum; i++) {
      let temp = []
      for (let j = 0; j < maxNum; j++) {
        temp.push(i*4 + j)
      }
      result.push(temp)
    }
    arr = result
    let zoom = matrix0(-1, maxNum, maxNum)
    score = 0
    addPath(arr, zoom, score)
    rend(arr, zoom, score)
  }

  bindAll()
  __init()
  testColor()
}

let __main = function() {
  game()
}

__main()
