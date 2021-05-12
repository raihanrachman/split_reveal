<template>
  <div class="container" data-scroll-container>
    <div class="content">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis,
      aliquam laboriosam porro qui maxime, accusantium tenetur aspernatur
      dignissimos quis facilis quod incidunt provident id in blanditiis natus
      veritatis veniam amet. Lorem ipsum dolor sit, amet consectetur adipisicing
      elit. Quidem accusantium, quis enim accusamus voluptatem deserunt harum
      fuga error provident voluptatibus sequi ipsam aspernatur nemo eligendi
      laborum aut, quasi esse beatae?
    </div>
    <div class="content content2" data-splitting>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis,
      aliquam laboriosam porro qui maxime, accusantium tenetur aspernatur
      dignissimos quis facilis quod incidunt provident id in blanditiis natus
      veritatis veniam amet. Lorem ipsum dolor sit, amet consectetur adipisicing
    </div>
    <div class="content">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis,
      aliquam laboriosam porro qui maxime, accusantium tenetur aspernatur
      dignissimos quis facilis quod incidunt provident id in blanditiis natus
      veritatis veniam amet. Lorem ipsum dolor sit, amet consectetur adipisicing
      elit. Quidem accusantium, quis enim accusamus voluptatem deserunt harum
      fuga error provident voluptatibus sequi ipsam aspernatur nemo eligendi
      laborum aut, quasi esse beatae?
    </div>
  </div>
</template>

<script>
import LocomotiveScroll from "locomotive-scroll";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";
import gsap from "gsap";
import splitReveal from "../plugins/splitReveal";

export default {
  methods: {
    initSplit() {
      let splitElement = [...document.querySelectorAll("[data-splitting]")];

      splitElement.forEach((el) => {
        let elRect = el.getBoundingClientRect();
        let lineHeight = 40;
        let scrolled = window.innerHeight - this.top - lineHeight;
        // console.log(scrolled, "top", elRect.height, "height");
        let totalWords;
        let words = [...el.querySelectorAll(".word")];

        totalWords = words.length;

        let revealedWord = Math.floor((scrolled / elRect.height) * totalWords);

        if (this.top < window.innerHeight) {
          console.log(revealedWord, "index", this.lastReveal);
          let diff = revealedWord - this.lastReveal;
          if (this.lastReveal < revealedWord) {
            for (let index = 0; index < diff; index++) {
              gsap.to(words[this.lastReveal++], {
                duration: 0.5,
                opacity: 1,
              });
            }
            this.lastReveal = revealedWord;
          }

          if (this.lastReveal > revealedWord) {
            console.log("ops2", diff);
            for (let index = 0; index < -diff; index++) {
              gsap.to(words[this.lastReveal--], {
                duration: 0.5,
                opacity: 0,
              });
            }
            this.lastReveal = revealedWord;
          }
          this.lastReveal = revealedWord;

          // gsap.to(words[revealedWord], {
          //   duration: 1,
          //   opacity: 1,
          // });
          // this.lastReveal = revealedWord;

          // if(window.innerHeight - this.top < elRect.height)
        }
      });

      // console.log(splitElement);

      // let totalWord =
      //load percentage
      //total container height
      //load speed
      //line height
      //total scrolled
    },
  },
  mounted() {
    console.log("running...");
    Splitting();

    const el = document.querySelector("[data-scroll-container]");
    const els = document.querySelector("[data-scroll-container]");

    const scroll = new LocomotiveScroll({
      el,
      smooth: true,
    });
    const split = new splitReveal(els, { scroll: scroll });
    const item = document.querySelector(".content2");
    let rect = item.getBoundingClientRect();
    console.log(scroll.y);
    let { top, left, height } = rect;
    this.top = top;

    scroll.on("scroll", ({ delta, scroll, speed }) => {
      let rect = item.getBoundingClientRect();
      // console.log(scroll.y);
      let { top, left, height } = rect;
      this.top = top;
      // if (this.top < window.innerHeight) {
      //   gsap.to(item, {
      //     duration: 4,
      //     opacity: 1,
      //   });
      // }

      // console.log(top, "top", height);
      this.initSplit();
    });

    this.initSplit();
  },
};
</script>

<style>
.container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.content {
  width: 50%;
  line-height: 50px;
  text-align: center;
  font-size: 40px;
  margin-bottom: 100px;
}

.content2 {
  /* opacity: 0; */
}

.word {
  opacity: 0;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
