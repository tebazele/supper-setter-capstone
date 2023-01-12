<template>
  <section class="main-section text-visible raleway">
    <h1 class="text-center mb-5 pt-md-4 pt-2">Our Amazing Team!</h1>



    <!-- dev team images and desc -->
    <div class="my-body raleway">
      <div class="my-container">
        <input type="radio" name="slider" id="item-1" checked />
        <input type="radio" name="slider" id="item-2" />
        <input type="radio" name="slider" id="item-3" />
        <input type="radio" name="slider" id="item-4" />
        <input type="radio" name="slider" id="item-5" />
        <input type="radio" name="slider" id="item-6" />


        <div class="raleway text-light cards">
          <!-- Jeanne Allen -->
          <label class="card" for="item-1" id="member-1">
            <img
              src="https://media.licdn.com/dms/image/C5603AQFt9rf6Z8q2Uw/profile-displayphoto-shrink_800_800/0/1519793362640?e=1678924800&v=beta&t=EasUzPh5Lz90j5SM-1lWg8K-tiD2W5NMGAhHRhqQLfk"
              alt="Jeanne Allen" />
            <div class="desc">
              <div class="desc-title d-flex justify-content-md-center justify-content-between px-3 px-md-0">
                <h3 class="fw-bold">Jeanne Allen</h3>
                <div class="icons d-flex gap-2 ps-3">
                  <a href="https://github.com/tebazele" target="_blank" class="mdi mdi-github fs-4" title="GitHub"></a>
                  <a class="mdi mdi-linkedin fs-4" title="LinkedIn" target="_blank"
                    href="https://www.linkedin.com/in/jeanne-allen-0437078/"></a>
                </div>
              </div>
              <div class="desc-body p-3 serif-pro">
                <span>This is my bio</span>
              </div>
            </div>
          </label>



          <!-- Derik Banning -->
          <label class="card" for="item-2" id="member-2">
            <img
              src="https://media.licdn.com/dms/image/D5603AQHH3QQktPzkyA/profile-displayphoto-shrink_400_400/0/1673548298160?e=1678924800&v=beta&t=OXCOKSrouahlZezAg8m4r3JNd9cGDHhYnFlbpKQOfT0"
              alt="Derik Banning" />
            <div class="desc">
              <div class="desc-title d-flex justify-content-md-center justify-content-between px-3 px-md-0">
                <h3 class="fw-bold">Derik Banning</h3>
                <div class="icons d-flex gap-2 ps-3">
                  <a href="https://github.com/deriklee451" target="_blank" class="mdi mdi-github fs-4"
                    title="GitHub"></a>
                  <a class="mdi mdi-linkedin fs-4" title="LinkedIn" target="_blank"
                    href="https://www.linkedin.com/in/derikbanning"></a>
                </div>
              </div>
              <div class="desc-body p-3">
                <span>Cool bio</span>
                <hr />
                <span>More cool bio</span>
              </div>
            </div>
          </label>



          <!-- Liam Smith -->
          <label class="card" for="item-3" id="member-3">
            <img
              src="https://images.unsplash.com/photo-1495216875107-c6c043eb703f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              alt="Liam Smith" />
            <div class="desc">
              <div class="desc-title d-flex justify-content-md-center justify-content-between px-3 px-md-0">
                <h3>Liam Smith</h3>
                <div class="icons d-flex gap-2 ps-3">
                  <a href="https://github.com/liamSmith1992" target="_blank" class="mdi mdi-github fs-4"
                    title="GitHub"></a>
                  <a class="mdi mdi-linkedin fs-4" title="LinkedIn" target="_blank"
                    href="https://www.linkedin.com/in/liam-smith123/"></a>
                </div>
              </div>
              <div class="desc-body p-3">
                <span>Cool bio</span>
              </div>
            </div>
          </label>



          <!-- Devin Withoft-->
          <label class="card" for="item-4" id="member-4">
            <img
              src="https://images.unsplash.com/photo-1495216875107-c6c043eb703f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              alt="Devin Withoft" />
            <div class="desc">
              <div class="desc-title d-flex justify-content-md-center justify-content-between px-3 px-md-0">
                <h3>Devin Withoft</h3>
                <div class="icons d-flex gap-2 ps-3">
                  <a href="https://github.com/devinwithoft" target="_blank" class="mdi mdi-github fs-4"
                    title="GitHub"></a>
                  <a class="mdi mdi-linkedin fs-4" title="LinkedIn" target="_blank" href=""></a>
                </div>
              </div>
              <div class="desc-body p-3">
                <span>Cool bio
                </span>
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import RecipeCard from "../components/RecipeCard.vue";

export default {
  setup() {

    return {

    };
  },

}
</script>

<style lang="scss" scoped>
a {
  color: whitesmoke;
}

.main-section {
  height: 90vh;
}

.my-body {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "DM Sans", sans-serif;
  transition: background 0.4s ease-in;
}

input[type="radio"] {
  display: none;
}

.my-container {
  width: 100%;
  max-width: 800px;
  max-height: 600px;
  height: 100%;
  transform-style: preserve-3d;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.cards {
  position: relative;
  width: 100%;
  height: 100%;
  margin-top: 3rem;
}

.card {
  position: absolute;
  width: 60%;
  height: fit-content;
  left: 0;
  right: 0;
  margin: auto;
  transition: transform 0.75s ease;
  cursor: pointer;
  border-radius: 10px;
  background-color: #258ea6;
}

img {
  width: 100%;
  max-height: 55vh;
  border-radius: 10px 10px 0 0;
  object-fit: cover;
}

.desc {
  display: none;
  padding: 0.5rem;
  backdrop-filter: blur(8px);
}

.desc-title {
  position: relative;
  border-bottom: 2px solid #62bcd1;
}

.desc-body {
  max-height: 25vh;
  overflow-y: auto;
}

@media (min-width: 768px) {
  .card {
    width: 80%;
  }

  .cards {
    margin-top: 0;
  }
}

@media (min-width: 768px) {
  .icons {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
  }
}

@media (min-width: 1400px) {
  img {
    max-height: 60vh;
  }
}

#item-1:checked~.cards #member-3,
#item-1:checked~.cards #member-4,
#item-1:checked~.cards #member-5,
#item-2:checked~.cards #member-4,
#item-2:checked~.cards #member-5,
#item-2:checked~.cards #member-6,
#item-3:checked~.cards #member-1,
#item-3:checked~.cards #member-5,
#item-3:checked~.cards #member-6,
#item-4:checked~.cards #member-1,
#item-4:checked~.cards #member-2,
#item-4:checked~.cards #member-6,
#item-5:checked~.cards #member-1,
#item-5:checked~.cards #member-2,
#item-5:checked~.cards #member-3,
#item-6:checked~.cards #member-2,
#item-6:checked~.cards #member-3,
#item-6:checked~.cards #member-4 {
  display: none;
}

// NOTE left this commented out bit in case we want to change the carousel style
// #item-1:checked~.cards #member-5,
// #item-2:checked~.cards #member-6,
// #item-3:checked~.cards #member-1,
// #item-4:checked~.cards #member-2,
// #item-5:checked~.cards #member-3,
// #item-6:checked~.cards #member-4 {
//   display: block;
//   transform: translatex(-80%) scale(.5);
//   opacity: .2;
//   z-index: 0;
// }
// #item-1:checked~.cards #member-3,
// #item-2:checked~.cards #member-4,
// #item-3:checked~.cards #member-5,
// #item-4:checked~.cards #member-6,
// #item-5:checked~.cards #member-1,
// #item-6:checked~.cards #member-2 {
//   display: block;
//   transform: translatex(80%) scale(.5);
//   opacity: .2;
//   z-index: 0;
// }
#item-1:checked~.cards #member-6,
#item-2:checked~.cards #member-1,
#item-3:checked~.cards #member-2,
#item-4:checked~.cards #member-3,
#item-5:checked~.cards #member-4,
#item-6:checked~.cards #member-5 {
  transform: translatex(-40%) scale(0.8);
  opacity: 0.4;
  z-index: 0;
}

#item-1:checked~.cards #member-2,
#item-2:checked~.cards #member-3,
#item-3:checked~.cards #member-4,
#item-4:checked~.cards #member-5,
#item-5:checked~.cards #member-6,
#item-6:checked~.cards #member-1 {
  transform: translatex(40%) scale(0.8);
  opacity: 0.4;
  z-index: 0;
}

#item-1:checked~.cards #member-1,
#item-2:checked~.cards #member-2,
#item-3:checked~.cards #member-3,
#item-4:checked~.cards #member-4,
#item-5:checked~.cards #member-5,
#item-6:checked~.cards #member-6 {
  transform: translatex(0) scale(1);
  width: 80%;
  opacity: 1;
  z-index: 1;
  cursor: default;

  img {
    box-shadow: 0px 0px 5px 0px rgba(81, 81, 81, 0.47);
  }
}

#item-1:checked~.cards #member-1>.desc,
#item-2:checked~.cards #member-2>.desc,
#item-3:checked~.cards #member-3>.desc,
#item-4:checked~.cards #member-4>.desc,
#item-5:checked~.cards #member-5>.desc,
#item-6:checked~.cards #member-6>.desc {
  display: block;
}
</style>
