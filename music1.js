const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const PLAYER_STORAGE_KEY = 'F8_PLAYER'
const player = $('.player')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')
const playBtn = $('.btn-toggle-play')
const progress = $('#progress')
const prevBtn = $('.btn-prev')
const nextBtn = $('.btn-next')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playList = $('.playlist')
const progressFix = $('.progress-fix')
const progressFix1 = $('.progress-fix1')
const rangeInputchidren = $('.range-Input-chidren')

const app = {
    currentIndex: 0,
    indexInput:0,
    isPlaying: false,
    isRandom: false,
    isRepeat:false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
    {
      name: "Dancin",
      singer: "Aaron Smith",
      path: 
        "./music/y2mate.com - Aaron Smith  Dancin KRONO Remix  Lyrics.mp3",
      image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
    },
    {
      name: "Tháng mấy em nhớ anh",
      singer: "Hà Anh Tuấn",
      path: 
        "./music/y2meta.com - [Official Lyric Video] Tháng Mấy Em Nhớ Anh_ __ Hà Anh Tuấn (128 kbps).mp3",
      image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
    },
    {
      name: "Thú Cuối",
      singer: "Mr.T Yanbi",
      path: 
        "./music/y2meta.com - [OFFICIAL MV] Thu Cuối - Mr.T ft Yanbi & Hằng Bingboong (128 kbps).mp3",
      image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
    },
    {
      name: "Có Khi",
      singer: "Hoài Lâm",
      path: 
        "./music/y2meta.com - Có Khi _ Hoài Lâm _ Official Lyrics Video (128 kbps).mp3",
      image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
    },
    {
      name: "Tháng tư là lời nói dối của em",
      singer: "Hà Anh Tuấn",
      path: 
        "./music/WaitingForYou-MONOOnionn-7733882 (1).mp3",
      image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
    },
    {
      name: "Waiting For You",
      singer: "MONO",
      path: 
        "./music/WaitingForYou-MONOOnionn-7733882 (1).mp3",
      image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
    },
    {
      name: "Nơi Tình Yêu Bắt Đầu",
      singer: "Bùi Anh Tuấn",
      path: 
        "./music/y2meta.com - Nơi Tình Yêu Bắt Đầu _ Bùi Anh Tuấn _ Lyrics Video (128 kbps).mp3",
      image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
    },
    {
      name: "Willow",
      singer: "I unknow",
      path: 
        "./music/y2mate.com - Willow  Wait A Minute Tiktok RemixLyrics  i think I left my conscience on your front doorstep.mp3",
      image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
    },
    {
      name: "Anh nên yêu cô ấy",
      singer: "N Ly",
      path: 
        "./music/y2mate.com - Anh Nên Yêu Cô Ấy  N Ly  Lyrics Video.mp3",
      image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
    },
    {
      name: "Lạc Trôi",
      singer: "Sơn Tùng",
      path: "./music/LacTroiTripleDRemix-SonTungMTP-5164670.mp3",
      image:
        "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
    },
    {
      name: "Đào Nương",
      singer: "Hoàng Vương",
      path:
        "./music/DaoNuong-HoangVuong-7037330.mp3",
      image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
    },
    {
      name: "Cưới Thôi",
      singer: "Masew-BBray",
      path: "./music/CuoiThoi-MasewMasiuBRayTAPVietNam-7085648.mp3",
      image:
        "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
    },
    {
      name: "Nơi Này Có Anh",
      singer: "Sơn Tùng",
      path: "./music/NoiNayCoAnhMasewRemix-SonTungMTP-4816830.mp3",
      image:
        "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
    },
    {
      name: "Tết Đong Đầy",
      singer: "V.Music",
      path:
        "./music/TetDongDay-VMusicNew-6931337 (1).mp3",
      image:
        "data:image/jpeg;base64,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"
    },
    {
      name: "Tết Sang",
      singer: "Nam Em",
      path: "./music/UpgradeTetSang-HoaKhoiNamEm-4304937.mp3",
      image:
        "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
    },
    
    ],
    setConfig: function(key,value) {
      this.config[key] = value;
      localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },
    render: function() {
      const htmls = this.songs.map( (song,index) => {
        return `
          <div class="song ${index == this.currentIndex ? 'active' : ''}" data-index="${index}">
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>   
          </div>    

        `
      })
      playList.innerHTML = htmls.join('')     
      
    },
    
    defineProperties: function() {
      Object.defineProperty(this, 'currentSong', {
        get: function() {
          return this.songs[this.currentIndex]
        }
      })
    },

    // lang nghe su kien
    handleEvents: function() {

      const _this = this;
      const cdWidth = cd.offsetWidth
      const decoPromis = new Promise((resolve) => {
        resolve()
      })
      decoPromis
        .then(() => {
          
          for (let index = 0; index <= 200; index++) {
            const progressDeco = document.createElement('div')
            const progressDeco1 = document.createElement('div')
            const decoHeight = Math.floor(Math.random() * 20) + 25
            progressDeco.style.height = decoHeight + 'px'
            progressDeco1.style.height = decoHeight - 10 + 'px'
            progressDeco.classList.add('deco')
            progressDeco1.classList.add('deco1')
            progressFix.appendChild(progressDeco) 
            progressFix1.appendChild(progressDeco1)
          }
          
        }
        )
        .then(() => {
          const decoPlay = $$('.deco')
          const decoPlay1 = $$('.deco1')
          const windowWidth = window.innerWidth / 2
          rangeInputchidren.style.transform = `translateX(${windowWidth - 16}px)`
          decoPlay[200].style.marginRight = windowWidth + 'px'
          decoPlay1[200].style.marginRight = windowWidth + 'px'
          

          audio.ontimeupdate = function() {
            
            if (audio.duration) {
              
              const progressPercent = Math.floor(audio.currentTime / audio.duration * 200)
              // progress.value = progressPercent  
              _this.indexInput = progressPercent
              decoPlay[progressPercent].classList.add('deco-color')
              decoPlay1[progressPercent].classList.add('deco-color1')
              $$('.deco.deco-color')[progressPercent].scrollIntoView({
                behavior: 'auto',
                inline: 'center'
              })
              
            }  
    
          }
          // xu ly quay va dung
          const csThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)'}
          ], {
            duration:10000,
            iterations: Infinity
          })
          csThumbAnimate.pause()
        
          // thay doi dao dien khi sroll
          document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCd = cdWidth - scrollTop
            cd.style.width = newCd > 0 ? newCd + 'px' : 0
            cd.style.opacity = newCd / cdWidth 
          }
        
          // khoi phat nhac
          playBtn.onclick = function() {
            if (_this.isPlaying) {
              audio.pause()
            }
            else {
              audio.play()      
            }
          
          }
          progressFix.style = "opacity: 0"
          progressFix1.style = "opacity: 0"
          progress.style = "opacity: 0.5"
          
        
          audio.onplay = function() {
            _this.isPlaying = true;
            player.classList.add('playing')
            progressFix.style = "opacity: 1"
            progressFix1.style = "opacity: 1"
            progress.style = "opacity: 0"
            
            csThumbAnimate.play()
          
          }
        
          audio.onpause = function() {
            _this.isPlaying = false;
            player.classList.remove('playing')
            progressFix.style = "opacity: 0"
            progressFix1.style = "opacity: 0"
            progress.style = "opacity: 0.5"
            csThumbAnimate.pause()
            progress.onchange = function(e) {
              const seekTime = audio.duration / 200 * e.target.value
              audio.currentTime = seekTime
              for(let index = 0; index <= 200; index++) {
                decoPlay[index].classList.remove('deco-color6')
                decoPlay1[index].classList.remove('deco-color7')
                decoPlay[index].classList.remove('deco-color4')
                decoPlay1[index].classList.remove('deco-color5')
                decoPlay[index].classList.remove('deco-color2')
                decoPlay1[index].classList.remove('deco-color3')
              }
              for (let index = 0; index <= 200; index++) {
                decoPlay[index].classList.remove('deco-color')
                decoPlay1[index].classList.remove('deco-color1')
              }
              for (let index = 0; index <= e.target.value; index++) {
                decoPlay[index].classList.add('deco-color')
                decoPlay1[index].classList.add('deco-color1')
              }
            }
          }
          // xu ly range khi song play
        
          // xu ly khi tua
         

          progress.oninput = (e) => {
            
            for(let index = 0; index <= 200; index++) {
              decoPlay[index].classList.remove('deco-color2')
              decoPlay1[index].classList.remove('deco-color3')
            }
            
            for(let index = 0; index <= e.target.value; index++) {
              decoPlay[index].classList.add('deco-color2')
              decoPlay1[index].classList.add('deco-color3')
            }
            if (_this.indexInput > e.target.value) {
              
              for(let index = 0; index <= 200; index++) {
                decoPlay[index].classList.remove('deco-color6')
                decoPlay1[index].classList.remove('deco-color7')
              }
              
              for(let index = 0; index <= e.target.value; index++) {
                decoPlay[index].classList.add('deco-color6')
                decoPlay1[index].classList.add('deco-color7')
              }
              for(let index = _this.indexInput; index > e.target.value; index--) {
                
                decoPlay[index].classList.add('deco-color4')
                decoPlay1[index].classList.add('deco-color5')
              }
            } else {
              for(let index = 0; index <= 200; index++) {
                decoPlay[index].classList.remove('deco-color4')
                decoPlay1[index].classList.remove('deco-color5')
              }
            }

          }
          progress.onchange = function(e) {
            const seekTime = audio.duration / 200 * e.target.value
            audio.currentTime = seekTime
            for(let index = 0; index <= 200; index++) {
              decoPlay[index].classList.remove('deco-color6')
              decoPlay1[index].classList.remove('deco-color7')
              decoPlay[index].classList.remove('deco-color4')
              decoPlay1[index].classList.remove('deco-color5')
              decoPlay[index].classList.remove('deco-color2')
              decoPlay1[index].classList.remove('deco-color3')
            }
            
            for (let index = 0; index <= 200; index++) {
              
              decoPlay[index].classList.remove('deco-color')
              decoPlay1[index].classList.remove('deco-color1')
            }
            for (let index = 0; index <= e.target.value; index++) {
              decoPlay[index].classList.add('deco-color')
              decoPlay1[index].classList.add('deco-color1')
            }
          }
          
          // Khi next song
          nextBtn.onclick = function() {
            
            for (let index = 0; index <= 200; index++) {
              const height = Math.floor(Math.random() * 20) + 25
              decoPlay[index].style.height = height + 'px'
              decoPlay1[index].style.height = height - 10 + 'px'
            }
            for (let index = 0; index <= 200; index++) {
              decoPlay[index].classList.remove('deco-color')
              decoPlay1[index].classList.remove('deco-color1')
            }
            
            if (_this.isRandom) {
              _this.playRandomSong()
            } else {
            _this.nextSong()
            
            }
            audio.play()
            _this.render()
          
          }
        
          // Khi prev song
          prevBtn.onclick = function() {
            for (let index = 0; index <= 200; index++) {
              const height = Math.floor(Math.random() * 20) + 25
              decoPlay[index].style.height = height + 'px'
              decoPlay1[index].style.height = height - 10 + 'px'
            }
            for (let index = 0; index <= 200; index++) {
              decoPlay[index].classList.remove('deco-color')
              decoPlay1[index].classList.remove('deco-color1')
            }
            if (_this.isRandom) {
              _this.playRandomSong()
            
            } else {
              _this.prevSong()
            }
            audio.play()
            _this.render()
          
          }
        
          // Play repeat song style
          repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat
            _this.setConfig('isRepeat', _this.isRepeat)
            repeatBtn.classList.toggle('active', _this.isRepeat)
          
          }
        
          // Play Random song style
          randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', _this.isRandom)
            randomBtn.classList.toggle('active', _this.isRandom)
          
          }
        
          // Xu ly next song khi audio ended
          audio.onended = function() {
            if (_this.isRepeat){
              audio.play()
            }
            else {
              nextBtn.click()
            }
          } 
        
          // Lang nghe su kien click vao playlist
          playList.onclick = function(e) {
            const songElement = e.target.closest('.song:not(.active)')
            if (songElement || e.target.closest('.option')) {
              for (let index = 0; index <= 200; index++) {
                const height = Math.floor(Math.random() * 20) + 25
                decoPlay[index].style.height = height + 'px'
                decoPlay1[index].style.height = height - 10 + 'px'
              }
              if (songElement) {
                for (let index = 0; index <= 200; index++) {
                  decoPlay[index].classList.remove('deco-color')
                  decoPlay1[index].classList.remove('deco-color1')
                }
              _this.currentIndex = songElement.dataset.index
              _this.loadCurrentSong()
              _this.render()
              audio.play()
              }
              if (e.target.closest('.option')) {
              }
            }
          }
            })
      
    },

    loadConfig: function() {
      this.isRandom = this.config.isRandom
      this.isRepeat = this.config.isRepeat
      randomBtn.classList.toggle('active', this.isRandom)
      repeatBtn.classList.toggle('active', this.isRepeat)

    },
    loadCurrentSong: function() {

    
      heading.textContent = this.currentSong.name
      cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
      audio.src = this.currentSong.path
    
    },

    nextSong: function () {
      this.currentIndex++;
      if (this.currentIndex >= this.songs.length) {
        this.currentIndex = 0;
      }
      this.loadCurrentSong();
    },
    prevSong: function () {
      this.currentIndex--;
      if (this.currentIndex < 0) {
        this.currentIndex = this.songs.length - 1;
      }
      this.loadCurrentSong();
    },

    playRandomSong: function() {
      let newIndex;
       do {
        newIndex = Math.floor(Math.random() * this.songs.length)
       } while (newIndex === this.currentIndex)
       this.currentIndex = newIndex
       this.loadCurrentSong()
    },

    // scroll view
   
    start: function() {
        // this.loadConfig()

        this.handleEvents()
        this.defineProperties()
        this.loadCurrentSong()
        this.render()
    }
}
app.start()
