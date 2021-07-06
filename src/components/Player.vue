<template>
  <div
    class="w-full h-screen flex flex-col bg-dark overflow-hidden"
    id="demo_wrap"
    style="height: 90vh"
  >
    <div
      class="flex flex-row justify-center w-full m-auto relative z-10"
      id="upper-div"
      style="height: 90%"
    >
      <div class="flex flex-col w-full md:w-5/12 bg-dark rounded-lg">
        <div class="m-auto w-4/5 mt-4 mb-0">
          <div
            v-for="(audio, indexo) in audios.slice(index, index + 1)"
            :key="indexo"
            class="mb-4"
          >
            <h3 class="text-xl text-white font-semibold">
              {{
                audio.title !== undefined
                  ? audio.title.length > 14
                    ? audio.title.substring(0, 11) + "..."
                    : audio.title
                  : "N/A"
              }}
            </h3>
            <p class="text-sm text-white mt-1">
              {{
                audio.artist !== undefined
                  ? audio.artist.length > 14
                    ? audio.artist.substring(0, 11) + "..."
                    : audio.artist
                  : "N/A"
              }}
            </p>
          </div>
          <div
            id="img-div"
            class="m-auto relative"
            style="width: 300px; height: 300px"
          >
            <img
              id="player-img"
              class="w-full rounded-full block m-auto h-full linear infinite"
              src="https://graphicheck.com/image/cache/catalog/freepik/music-is-life-free-logo-templates-download-800x800.png"
              alt="Album Pic"
            />
            <div class="cd-center"></div>
          </div>
        </div>
        <div
          class="flex w-4/5 m-auto justify-between items-center mt-8 mb-4"
          id="control-panel"
        >
          <div class="text-lightest hover:bg-dark rounded-full p-1">
            <svg
              @click="random = !random"
              :class="random ? 'text-white' : ''"
              class="w-8 h-8 cursor-pointer"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M6.59 12.83L4.4 15c-.58.58-1.59 1-2.4 1H0v-2h2c.29 0 .8-.2 1-.41l2.17-2.18 1.42 1.42zM16 4V1l4 4-4 4V6h-2c-.29 0-.8.2-1 .41l-2.17 2.18L9.4 7.17 11.6 5c.58-.58 1.59-1 2.41-1h2zm0 10v-3l4 4-4 4v-3h-2c-.82 0-1.83-.42-2.41-1l-8.6-8.59C2.8 6.21 2.3 6 2 6H0V4h2c.82 0 1.83.42 2.41 1l8.6 8.59c.2.2.7.41.99.41h2z"
              />
            </svg>
          </div>
          <div class="text-white hover:bg-dark rounded-full p-1">
            <svg
              @click="prevButton ? previous() : ''"
              class="w-8 h-8 cursor-pointer"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M4 5h3v10H4V5zm12 0v10l-9-5 9-5z" />
            </svg>
          </div>
          <div
            class="
              text-white
              p-4
              rounded-full
              bg-gradient-to-r
              from-red-500
              via-red-600
              to-red-700
              shadow-lg
            "
          >
            <svg
              v-if="!pauseTrack"
              @click="play()"
              class="w-8 h-8 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <svg
              v-else
              @click="pause()"
              class="w-8 h-8 cursor-pointer"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z" />
            </svg>
          </div>
          <div class="text-white hover:bg-dark rounded-full p-1">
            <svg
              @click="nextButton ? next() : ''"
              class="w-8 h-8 cursor-pointer"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M13 5h3v10h-3V5zM4 5l9 5-9 5V5z" />
            </svg>
          </div>
          <div class="text-lightest hover:bg-dark rounded-full p-1">
            <svg
              @click="repeat = !repeat"
              :class="repeat ? 'text-white' : ''"
              class="w-8 h-8 cursor-pointer"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M5 4a2 2 0 0 0-2 2v6H0l4 4 4-4H5V6h7l2-2H5zm10 4h-3l4-4 4 4h-3v6a2 2 0 0 1-2 2H6l2-2h7V8z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div class="w-7/12 hidden md:block">
        <ul
          class="w-full overflow-auto m-auto mb-2 bg-dark pt-2"
          style="max-height: 100%"
          id="journal-scroll"
        >
          <li
            @click="selectSound(indexo)"
            :style="indexo == index ? '' : ''"
            :class="indexo == index ? 'bg-red-600 text-white' : 'text-white'"
            class="
              flex
              py-1
              rounded
              cursor-pointer
              w-11/12
              m-auto
              hover:bg-lightest
            "
            v-for="(audio, indexo) in audios"
            :key="indexo"
            style="padding-left: 40px"
          >
            <div class="w-1/5 font-semibold m-auto">
              {{ indexo + 1 }}
            </div>
            <div class="w-3/5 font-semibold text-left m-auto">
              <div class="font-semibold text-sm text-white">
                <p>{{ audio.title }}</p>
                <p class="text-xs text-white">{{ audio.artist }}</p>
              </div>
            </div>
            <div class="w-1/5 m-auto">
              <svg
                v-if="state.audioPlaying[indexo]"
                class="w-6 h-6 m-auto"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z" />
              </svg>
              <svg
                v-else
                class="w-6 h-6 m-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="w-full bg-dark relative z-10" style="height: 10%">
      <div class="flex w-11/12 h-16 items-center justify-around m-auto">
        <div
          class="w-2/12 md:flex items-center hidden"
          v-for="(audio, indexo) in audios.slice(index, index + 1)"
          :key="indexo"
        >
          <img
            class="w-10 h-10 rounded-full linear infinite"
            id="player-img-small"
            src="https://graphicheck.com/image/cache/catalog/freepik/music-is-life-free-logo-templates-download-800x800.png"
            alt="Album Pic"
          />
          <div class="flex flex-col ml-2 font-semibold">
            <p class="text-white">
              {{
                audio.title !== undefined
                  ? audio.title.length > 14
                    ? audio.title.substring(0, 11) + "..."
                    : audio.title
                  : "N/A"
              }}
            </p>
            <p class="text-xs text-white">
              {{
                audio.artist !== undefined
                  ? audio.artist.length > 14
                    ? audio.artist.substring(0, 11) + "..."
                    : audio.artist
                  : "N/A"
              }}
            </p>
          </div>
        </div>
        <div class="w-4/5 flex md:w-8/12 items-center">
          <div class="text-sm text-white w-2/12 md:w-1/12 font-semibold">
            <p>{{ timer }}</p>
          </div>
          <div class="mt-1 relative w-8/12 md:w-10/12">
            <div
              @click="seek($event)"
              ref="progress"
              class="h-1 bg-white cursor-pointer rounded-full bg-gray-500"
            >
              <div
                class="
                  flex
                  w-full
                  justify-end
                  h-1
                  bg-gradient-to-r
                  from-red-500
                  to-red-700
                  rounded-full
                  relative
                "
                :style="{ width: step + '%' }"
              ></div>
            </div>
            <div
              class="flex w-full justify-end h-1 rounded-full relative"
              :style="{ width: step + '%' }"
            >
              <span
                id="progressButtonTimer"
                class="
                  w-3
                  h-3
                  md:w-4
                  md:h-4
                  bg-gradient-to-r
                  from-red-500
                  to-red-700
                  absolute
                  pin-r pin-b
                  -mb-1
                  rounded-full
                  shadow
                "
              ></span>
            </div>
          </div>
          <div class="text-sm text-white w-2/12 md:w-1/12 font-semibold ml-5">
            <p>{{ duration }}</p>
          </div>
        </div>

        <div class="w-1/5 flex md:w-2/12 m-auto items-center">
          <div
            class="w-3/12 md:w-2/12 hover:bg-dark rounded-full md:p-1 mr-2"
            @click="mute()"
          >
            <svg
              v-if="mutePlayer"
              class="w-6 h-6 m-auto text-white-500 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                clip-rule="evenodd"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
              />
            </svg>
            <svg
              v-else
              class="w-6 h-6 m-auto cursor-pointer text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
            </svg>
          </div>
          <div class="w-9/12 md:w-10/12 m-auto relative">
            <div
              @click="volume($event)"
              ref="volBar"
              class="
                h-1
                bg-red
                cursor-pointer
                rounded-full
                bg-gray-500
                m-auto
                relative
              "
              style="width: 90%"
            >
              <div
                class="
                  flex
                  justify-end
                  h-1
                  bg-gradient-to-r
                  from-teal-400
                  to-blue-500
                  rounded-full
                  relative
                "
                :style="{ width: volumeProgress + '%' }"
              ></div>
            </div>
            <div
              class="flex justify-end h-1 rounded-full relative"
              :style="{ width: volumeProgress + '%' }"
            >
              <span
                id="progressButtonVolume"
                class="
                  w-3
                  h-3
                  md:w-4
                  md:h-4
                  bg-lightest
                  absolute
                  pin-r pin-b
                  -mb-1
                  rounded-full
                  shadow
                "
              ></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      id="lower-list"
      class="w-12/12 md:block"
      style="overflow-y: auto; display: none; height: 35% !important"
    >
      <ul
        class="w-full overflow-auto m-auto mb-2 bg-dark pt-2"
        style=""
        id="journal-scroll"
      >
        <li
          @click="selectSound(indexo)"
          :style="indexo == index ? '' : ''"
          :class="indexo == index ? ' bg-red-600 text-white' : 'text-white'"
          class="
            flex
            py-1
            rounded
            cursor-pointer
            w-11/12
            m-auto
            hover:bg-lightest
          "
          v-for="(audio, indexo) in audios"
          :key="indexo"
          style="padding-left: 40px"
        >
          <div class="w-1/5 font-semibold m-auto">
            {{ indexo + 1 }}
          </div>
          <div class="w-3/5 font-semibold text-left m-auto">
            <div class="font-semibold text-sm text-white">
              <p>
                {{
                  audio.title !== undefined
                    ? audio.title.length > 14
                      ? audio.title.substring(0, 11) + "..."
                      : audio.title
                    : "N/A"
                }}
              </p>
              <p class="text-xs text-white">
                {{
                  audio.artist !== undefined
                    ? audio.artist.length > 14
                      ? audio.artist.substring(0, 11) + "..."
                      : audio.artist
                    : "N/A"
                }}
              </p>
            </div>
          </div>
          <div class="w-1/5 m-auto">
            <svg
              v-if="state.audioPlaying[indexo]"
              class="w-6 h-6 m-auto"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z" />
            </svg>
            <svg
              v-else
              class="w-6 h-6 m-auto"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { ref, reactive, computed } from 'vue';
import { Howl, Howler } from 'howler';

export default {
	props: ['playList', 'playSong'],
	mounted() {
		var sound = this.audios[this.index].howl;
		var barWidth = (0.9 * 100) / 100;
		this.sliderBtnVol = this.volBar.offsetWidth * barWidth + this.volBar.offsetWidth * 0.05 - 25;
	},
	watch: {
		playList: function () {
			let list = this.playList;
			this.setList(list);
		},
		playSong: function () {
			if (this.playSong) {
				// this.play();
			} else {
				Howler.stop();
				this.pause();
			}
		},
	},

	setup(props, { emit }) {
		const audios = ref([
			{
				// name: 'Tera Suroor',
				// file: 'https://firebasestorage.googleapis.com/v0/b/streamer-22d50.appspot.com/o/01%20-%20Tera%20Suroor(MyMp3Song.Com).mp3?alt=media&token=c039f798-9e9d-43a4-8e8a-62d8506eb8c3',
				// artist: 'Shubham',
				// howl: null,
			},
		]);
		const step = ref(0);
		const nextButton = ref(true);
		const prevButton = ref(true);
		const random = ref(false);
		const repeat = ref(false);
		const index = ref(0);
		const duration = ref('00:00');
		const timer = ref('00:00');
		const pauseTrack = ref(false);
		const progress = ref(null);
		const volBar = ref(null);
		const sliderBtn = ref(0);
		const sliderBtnVol = ref(null);
		const volumeProgress = ref(90);
		const mutePlayer = ref(false);
		const state = reactive({
			audioPlaying: [],
			list: [],
		});
		function setList(list) {
			Howler.stop();
			pause();
			state.list = [...list];
			audios.value = state.list;
			selectSound(0);
		}

		function formatTime(secs) {
			var minutes = Math.floor(secs / 60) || 0;
			var seconds = Math.floor(secs - minutes * 60) || 0;

			return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
		}
		function play() {
			var sound;

			var audio = audios.value[index.value];
			if (audio.howl) {
				sound = audio.howl;
			} else {
				state.audioPlaying[index.value] = false;
				sound = audio.howl = new Howl({
					src: [audio.file],
					html5: true, // A live stream can only be played through HTML5 Audio.
					format: ['mp3', 'aac'],
					onplay: function () {
						pauseTrack.value = true;
						nextButton.value = true;
						prevButton.value = true;
						duration.value = formatTime(sound.duration());
						requestAnimationFrame(stepFunction.bind(this));
					},
					onpause: function () {
						pauseTrack.value = false;
					},
					onend: function () {
						next();
					},
					onseek: function () {
						window.requestAnimationFrame(stepFunction.bind(this));
					},
				});
			}

			emit('click-on-play', state.list[index.value].id);
			sound.play();
			state.audioPlaying[index.value] = true;

			document.getElementById('player-img').classList += ' rotate';
			document.getElementById('player-img-small').classList += ' rotate';
			document.getElementById('player-img').src = state.list[index.value].src;
			document.getElementById('player-img-small').src = state.list[index.value].src;
			// console.log(state.list[index.value]);
		}
		function pause() {
			var audio = audios.value[index.value].howl;

			if (audio) {
				audio.pause();
				pauseTrack.value = false;
				state.audioPlaying[index.value] = false;
			}
			if (state.list.length > 0) emit('click-on-pause', state.list[index.value].id);

			document.getElementById('player-img').classList.remove('rotate');
			document.getElementById('player-img-small').classList.remove('rotate');
		}

		function stepFunction() {
			var sound = audios.value[index.value].howl;
			var seek = sound.seek();
			timer.value = formatTime(Math.round(seek));
			step.value = (seek * 100) / sound.duration();

			sliderBtn.value = progress.value.offsetWidth * (step.value / 100) + progress.value.offsetWidth * 0.05 - 25;

			if (sound.playing()) {
				window.requestAnimationFrame(stepFunction.bind(this));
			}
		}

		function seek(event) {
			var per = event.offsetX / progress.value.clientWidth;

			var sound = audios.value[index.value].howl;

			if (sound) {
				if (sound.playing()) {
					sound.pause();
					sound.seek(sound.duration() * per);
					var barWidth = (per * 100) / 100;
					sliderBtn.value = progress.value.offsetWidth * barWidth + progress.value.offsetWidth * 0.05 - 25;
					sound.play();
				} else {
					sound.seek(sound.duration() * per);
					var barWidth = (per * 100) / 100;
					sliderBtn.value = progress.value.offsetWidth * barWidth + progress.value.offsetWidth * 0.05 - 25;
				}
			}
		}

		function next() {
			console.log('Next Song');

			nextButton.value = false;
			var audio = audios.value[index.value].howl;

			state.audioPlaying[index.value] = false;

			mutePlayer.value ? (mutePlayer.value = false) : '';
			audio && audio.mute(true) ? audio.mute(false) : '';

			if (audio && audios.value.length - 1 == index.value) {
				audio.stop();

				repeat.value
					? (index.value = index.value)
					: random.value
					? (index.value = Math.floor(Math.random() * audios.value.length))
					: (index.value = 0);
			} else {
				if (audio) {
					audio.stop();
				}

				repeat.value
					? (index.value = index.value)
					: random.value
					? (index.value = Math.floor(Math.random() * audios.value.length))
					: index.value++;
			}

			emit('update-selected-index', state.list[index.value].id);

			play();
		}

		function previous() {
			var audio = audios.value[index.value].howl;
			prevButton.value = false;
			state.audioPlaying[index.value] = false;

			mutePlayer.value ? (mutePlayer.value = false) : '';
			audio && audio.mute(true) ? audio.mute(false) : '';

			if (!audio) {
				index.value = audios.value.length - 1;
			} else if (audio && index.value == 0) {
				audio.stop();

				repeat.value
					? (index.value = index.value)
					: random.value
					? (index.value = Math.floor(Math.random() * audios.value.length))
					: (index.value = audios.value.length - 1);
			} else if (audio) {
				audio.stop();

				repeat.value
					? (index.value = index.value)
					: random.value
					? (index.value = Math.floor(Math.random() * audios.value.length))
					: index.value--;
			}

			emit('update-selected-index', state.list[index.value].id);

			play();
		}
		function selectSound(indexSelected) {
			emit('update-selected-index', state.list[indexSelected].id);

			var audio = audios.value[index.value].howl;

			if (audio) {
				audio.stop();
				state.audioPlaying[index.value] = false;
			}

			index.value = indexSelected;

			play();
		}

		function volume(event) {
			var per = event.layerX / parseFloat(volBar.value.scrollWidth);
			var barWidth = (per * 100) / 100;
			volumeProgress.value = barWidth * 100;
			sliderBtnVol.value = volBar.value.offsetWidth * barWidth + volBar.value.offsetWidth * 0.05 - 25;
			Howler.volume(per);
		}

		function mute() {
			var audio = audios.value[index.value].howl;

			if (audio) {
				mutePlayer.value = !mutePlayer.value;

				mutePlayer.value ? audio.mute(true) : audio.mute(false);
			}
		}

		return {
			play,
			pause,
			duration,
			formatTime,
			audios,
			pauseTrack,
			next,
			previous,
			index,
			timer,
			step,
			stepFunction,
			seek,
			selectSound,
			state,
			random,
			repeat,
			progress,
			volume,
			volBar,
			volumeProgress,
			sliderBtn,
			mute,
			mutePlayer,
			sliderBtnVol,
			nextButton,
			prevButton,
			setList,
		};
	},
};
</script>

<style>
.cd-center {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 60px;
	height: 60px;
	border-radius: 50%;
}

#progressButtonTimer,
#progressButtonVolume {
	margin-top: -9px;
	right: -8px;
}

.rotate {
	animation: rotation 10s;
}

.linear {
	animation-timing-function: linear;
}

.infinite {
	animation-iteration-count: infinite;
}

@keyframes rotation {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(359deg);
	}
}

@media screen and (max-width: 768px) {
	#progressButtonTimer,
	#progressButtonVolume {
		margin-top: -8px;
		right: -7px;
	}
}

@media (max-width: 420px) {
	#lower-list {
		display: block !important;
	}
	#upper-div {
		height: 50% !important;
	}
	#img-div {
		zoom: 0.6 !important;
	}
	#control-panel {
		margin-top: 10px;
	}
	#lower-list {
		max-height: 28% !important;
	}
}

@media (max-width: 370px) {
	#lower-list {
		display: block !important;
	}
	#upper-div {
		height: 50% !important;
		margin-top: 5px !important;
	}
	#img-div {
		zoom: 0.6 !important;
	}
	#control-panel {
		margin-top: 10px;
	}
	#lower-list {
		max-height: 30% !important;
	}
}
</style>
