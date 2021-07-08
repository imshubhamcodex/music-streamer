<template>
	<div class="container-box no-select">
		<div class="bg-dark h-screen" style="overflow-y: hidden; overflow-x: hidden">
			<div id="top_main" class="flex l_height">
				<!--side nav -->
				<div v-show="nav_show" class="w-56 bg-black h-full flex-none side-nav-div">
					<div class="p-6 flex item center justify-between">
						<h1 class="text-xl font-bold text-white">Music Archive</h1>
					</div>
					<div class="mx-2" style="color: white">
						<button
							v-for="page in pages"
							:key="page.id"
							:id="page.id"
							@click="sideNavs(page.id)"
							:class="`w-full text-xs font-semibold rounded px-3 py-2 my-2 flex items-center justify-start ${
								setID === page.id ? 'bg-light text-white' : 'text-lighest'
							}`"
						>
							<i class="material-icons mr-3" style="max-width: 20px">{{ page.icon }}</i>
							<p>{{ page.name }}  {{page.id==='home'? "( "+all_songs +" )":' '}} </p>
						</button>
					</div>
					<div class="mx-2" style="color: white">
						<h1 class="text-xs text-lightest tracking-widget uppercase">Playlist</h1>
						<button
							@click="favFun()"
							:class="` mt-2 w-full text-xs font-semibold rounded px-3 py-2 flex items-center justify-start ${
								setID === 'favorite' ? 'bg-light text-white' : 'text-lighest'
							}`"
						>
							<i class="material-icons mr-3">favorite</i>
							<p>Favorite ( {{this.fav.length}} )</p>
						</button>
						<button
							@click="playlist('love')"
							:class="` mt-2 w-full text-xs font-semibold rounded px-3 py-2 flex items-center justify-start ${
								setID === 'love' ? 'bg-light text-white' : 'text-lighest'
							}`"
						>
							<i class="material-icons mr-3">volunteer_activism</i>
							<p>Love  ( {{ love_songs }} )</p>
						</button>
						<button
							@click="playlist('party')"
							:class="` mt-2 w-full text-xs font-semibold rounded px-3 py-2 flex items-center justify-start ${
								setID === 'party' ? 'bg-light text-white' : 'text-lighest'
							}`"
						>
							<i class="material-icons mr-3">celebration</i>
							<p>Party  ( {{ party_songs }} )</p>
						</button>
						<button
							@click="playlist('hip-hop')"
							:class="` mt-2 w-full text-xs font-semibold rounded px-3 py-2 flex items-center justify-start ${
								setID === 'hip-hop' ? 'bg-light text-white' : 'text-lighest'
							}`"
						>
							<i class="material-icons mr-3">nightlife</i>
							<p>Hip Hop  ( {{ hip_hop_songs }} )</p>
						</button>
						<button
							@click="playlist('classical')"
							:class="` mt-2 w-full text-xs font-semibold rounded px-3 py-2 flex items-center justify-start ${
								setID === 'classical' ? 'bg-light text-white' : 'text-lighest'
							}`"
						>
							<i class="material-icons mr-3">piano</i>
							<p>Classical  ( {{ classical_songs }} ) </p>
						</button>
						<button
							@click="playlist('pop')"
							:class="` mt-2 w-full text-xs font-semibold rounded px-3 py-2 flex items-center justify-start ${
								setID === 'pop' ? 'bg-light text-white' : 'text-lighest'
							}`"
						>
							<i class="material-icons mr-3">equalizer</i>
							<p>Pop  ( {{ pop_songs }} )</p>
						</button>
						<button
							@click="playlist('rock')"
							:class="` mt-2 w-full text-xs font-semibold rounded px-3 py-2 flex items-center justify-start ${
								setID === 'rock' ? 'bg-light text-white' : 'text-lighest'
							}`"
						>
							<i class="material-icons mr-3">speaker</i>
							<p>Rock  ( {{ rock_songs }} )</p>
						</button>
						<button
							@click="playlist('sad')"
							:class="` mt-2 w-full text-xs font-semibold rounded px-3 py-2 flex items-center justify-start ${
								setID === 'sad' ? 'bg-light text-white' : 'text-lighest'
							}`"
						>
							<i class="material-icons mr-3">sentiment_dissatisfied</i>
							<p>Sad  ( {{ sad_songs }} )</p>
						</button>
					</div>
					<div class="h-px w-full bg-light my-3"></div>

					<div class="relative pt-0 mt-0" style="margin-top: -5px">
						<!-- <div class="flex items-center justify-start pl-2">
							<img
								:src="`${this.currentPlaying.src}`"
								alt="playing music"
								style="height: 200px; width: 205px"
							/>
						</div> -->
						<h1 class="pl-2 mt-0 text-sm font-semibold text-white tracking wide">Crafted with ❤️</h1>
						<h2 class="pl-2 text-xs text-lightest text-white tracking wide">By Shubham</h2>
					</div>
				</div>

				<!--main content -->
				<div class="w-full h-full relative" style="color: white; overflow-y: auto">
					<!--header -->
					<div class="bg-dark w-full sticky top-0 p-2 h-16" style="z-index: 99">
						<button
							@click="toggleNav()"
							class="px-3 py-2 mt-5 ml-2 hover:text-white hover:text-white"
							style="zoom: 0.7; width: 50px; height: 50px; border-radius: 50%; border: 1px solid white"
						>
							<i class="material-icons mr-3 text-sm hover:text-white" style="zoom: 1.5">menu</i>
						</button>
						<span class="ml-5"></span>
						<button
							class="px-3 py-2 mt-5 ml-2 hover:text-white hover:text-white"
							style="zoom: 0.5; width: 50px; height: 50px; border-radius: 50%; border: 1px solid white"
						>
							<i class="material-icons mr-3 text-sm hover:text-white" style="zoom: 1.5">arrow_left</i>
						</button>
						<span class="ml-5"></span>
						<button
							class="px-3 py-2 mt-5 ml-2 hover:text-white hover:text-white"
							style="zoom: 0.5; width: 50px; height: 50px; border-radius: 50%; border: 1px solid white"
						>
							<i class="material-icons mr-3 text-sm hover:text-white" style="zoom: 1.5">arrow_right</i>
						</button>
					</div>
					<!--header end-->

					<div
						v-if="showRedirect"
						id="redirect_div"
						style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 99"
					>
						<h1 id="redirect_head1" class="text-2xl font-semibold text-white tracking-wider">
							Redirecting...
						</h1>
						<h1 id="redirect_head2" class="text-xl font-semibold text-white tracking-wider">
							Navigating to upload page!
						</h1>
						<h1
							style="cursor: pointer"
							id="redirect_head3"
							class="text-xl font-semibold text-white tracking-wider"
							@click="sideNavs('add')"
						></h1>
					</div>

					<!--cards recent played -->
					<div v-show="!showRedirect" class="px-6 py-5">
						<div class="px-3 py-1 flex item center justify-between">
							<h1 id="recents_head" class="text-2xl font-semibold text-white tracking-wider">
								Recent Played
							</h1>
							<h2
								id="see_all_recent"
								@click="showAllRecent()"
								class="text-xs font-semibold text-white tracking-wider hover:underline uppercase"
							>
								see all
							</h2>
						</div>
						<div class="w-full flex flex-wrap flex_div">
							<div
								class="p-2 w-48 relative"
								v-for="(recent, index) in tempRecents"
								:key="index + 'recent'"
							>
								<div
									class="
										absolute
										w-full
										h-full
										flex
										items-end
										justify-end
										p-8
										opacity-0
										hover:opacity-100
									"
									:id="recent.id + 'hover-recent'"
									style="cursor: pointer"
								>
									<div
										class="bg-green rounded-full h-10 w-10 flex item center justify-center"
										:id="recent.id + 'recent'"
										@click="recentPlay(recent.id + 'recent')"
									>
										<i class="material-icons text-2xl pt-1" style="color: white">play_arrow</i>
									</div>
									<div
										class="rounded-full h-10 w-10 flex item center justify-center"
										style="
											color: white;
											top: 10px;
											position: absolute;
											right: 35px;
											background: grey;
										"
										:class="{ bgWhite: recent.fav }"
										@click="setFav"
									>
										<i
											:id="recent.id + '-fav-recent'"
											class="material-icons text-2xl pt-1"
											:class="{ colorRed: recent.fav }"
											>favorite</i
										>
									</div>
								</div>

								<div class="bg-light w-full h-auto p-5">
									<img
										:src="`${recent.src}`"
										class="w-full h-auto shadow rounded mb-2"
										style="height: 100px !important; width: 100%"
									/>
									<h1 class="text-sm font-semibold text-white tracking wide">
										{{
											recent.title.length > 14
												? recent.title.substring(0, 11) + '...'
												: recent.title
										}}
									</h1>
									<h2 class="text-xs text-lightest text-white tracking wide">
										{{
											recent.artist.length > 14
												? recent.artist.substring(0, 11) + '...'
												: recent.artist
										}}
									</h2>
								</div>
							</div>
						</div>
					</div>
					<!--cards recent played  close-->

					<!--cards made for you -->
					<div v-show="!showRedirect" class="px-6 py-5" style="padding-bottom: 25px">
						<div class="px-3 py-1 flex item center justify-between">
							<h1 class="text-2xl font-semibold text-white tracking-wider">Made for You</h1>
							<h2
								id="see_all_custom"
								@click="showAllCustom()"
								class="text-xs font-semibold text-white tracking-wider hover:underline uppercase"
							>
								see all
							</h2>
						</div>
						<h2 class="ml-2 mb-1 text-xs text-lightest text-white tracking-wider">
							Get better recommendation more you listen
						</h2>
						<div class="w-full flex flex-wrap flex_div">
							<div
								class="p-2 w-48 relative"
								v-for="(custom, index) in tempCustoms"
								:key="index + 'customs'"
							>
								<div
									class="
										absolute
										w-full
										h-full
										flex
										items-end
										justify-end
										p-8
										opacity-0
										hover:opacity-100
									"
									:id="custom.id + 'hover'"
									style="cursor: pointer"
								>
									<div
										class="bg-green rounded-full h-10 w-10 flex item center justify-center"
										:id="custom.id"
										@click="customPlay(custom.id)"
									>
										<i class="material-icons text-2xl pt-1" style="color: white">play_arrow</i>
									</div>
									<div
										class="rounded-full h-10 w-10 flex item center justify-center"
										style="
											color: white;
											top: 10px;
											position: absolute;
											right: 35px;
											background: grey;
										"
										:class="{ bgWhite: custom.fav }"
										@click="setFav"
									>
										<i
											:id="custom.id + '-fav-custom'"
											class="material-icons text-2xl pt-1"
											:class="{ colorRed: custom.fav }"
											>favorite</i
										>
									</div>
								</div>

								<div class="bg-light w-full h-auto p-5">
									<img
										:src="`${custom.src}`"
										class="w-full h-auto shadow rounded mb-2"
										style="height: 100px !important; width: 100%"
									/>
									<h1 class="text-sm font-semibold text-white tracking wide">
										{{
											custom.title.length > 14
												? custom.title.substring(0, 11) + '...'
												: custom.title
										}}
									</h1>
									<h2 class="text-xs text-lightest text-white tracking wide">
										{{
											custom.artist.length > 14
												? custom.artist.substring(0, 11) + '...'
												: custom.artist
										}}
									</h2>
								</div>
							</div>
						</div>
					</div>
					<!--cards made for you close -->
				</div>
			</div>
			<!--play bar -->
			<div
				id="play_bar"
				v-show="!closePlayer"
				@click="showplayer()"
				class="w-full bg-light low_z_index"
				style="height: 10vh; color: white; cursor: pointer; float: both; position: fixed; bottom: 0px"
			>
				<div class="px-3 py-1 flex item center justify-between">
					<div class="relative">
						<div class="flex items-center justify-center pl-2">
							<img
								:src="`${this.currentPlaying.src}`"
								class="w-15 h-12 shadow pt-2 mt-1"
								alt="playing music"
								style="width: 40px; height: 45px"
							/>
							<h1 class="pl-2 text-sm font-semibold text-white tracking wide">
								{{ this.currentPlaying.title }}
							</h1>
							<h2 class="pl-2 text-xs text-lightest text-white tracking wide">
								{{ this.currentPlaying.artist }}
							</h2>
						</div>
					</div>
					<div class="flex item center justify-around">
						<i
							class="material-icons mr-3 text-sm hover:text-white mt-1"
							style="zoom: 2; cursor: pointer"
							id="arrow_btn_tog"
							>arrow_drop_up</i
						>

						<i
							class="material-icons mr-3 text-sm hover:text-white mt-1"
							style="zoom: 2; cursor: pointer; margin-right: 0px"
							@click="closeMusic()"
							>close</i
						>
					</div>
				</div>
			</div>
		</div>
		<div v-show="!closePlayer" class="bg-dark player-div" style="top: 0; height: 50vh; width: 100vw; z-index: 100">
			<Player
				style="z-index: 100"
				:playList="this.playList"
				:playSong="this.currentPlaying.playing"
				@update-selected-index="updateSelectedIndex"
				@click-on-play="clickOnPlay"
				@click-on-pause="clickOnPause"
			/>
		</div>
		<!-- <router-view /> -->
	</div>
</template>

<script>
import Player from './components/Player.vue';
import axios from 'axios';
export default {
	components: {
		Player,
	},
	data() {
		return {
			pages: [
				{ id: 'home', name: 'Home', icon: 'home' },
				{ id: 'add', name: 'Add Music', icon: 'addition' },
			],
			recents: [],
			customs: [],
			fav: [],
			showRedirect: false,

			tempRecents: [],
			tempCustoms: [],

			currentPlaying: {
				src: 'https://graphicheck.com/image/cache/catalog/freepik/music-is-life-free-logo-templates-download-800x800.png',
				title: 'Crafted with ❤️',
				artist: 'By Shubham',
				id: null,
				playing: false,
				file: 'N/A',
			},

			playList: [],

			setID: 'home',
			player: false,
			nav: false,
			nav_show: false,

			closePlayer: false,

			all_songs: 0,
			love_songs: 0,
			party_songs: 0,
			hip_hop_songs: 0,
			classical_songs: 0,
			pop_songs: 0,
			rock_songs: 0,
			sad_songs:0
		};
	},
	methods: {
		showAllCustom() {
			if (this.tempCustoms.length < this.customs.length) {
				this.tempCustoms = this.customs;
			} else {
				if (this.tempCustoms.length >= 24) this.tempCustoms = this.tempCustoms.slice(0, 24);
				else this.tempCustoms = this.customs;
			}

			if (document.getElementById('see_all_custom').textContent.toLowerCase() === 'hide') {
				document.getElementById('see_all_custom').textContent = 'see all';
			} else {
				document.getElementById('see_all_custom').textContent = 'hide';
			}
		},
		showAllRecent() {
			if (this.tempRecents.length < this.recents.length) {
				this.tempRecents = this.recents;
			} else {
				if (this.tempRecents.length >= 12) this.tempRecents = this.tempRecents.slice(0, 12);
				else this.tempRecents = this.recents;
			}

			if (document.getElementById('see_all_recent').textContent.toLowerCase() === 'hide') {
				document.getElementById('see_all_recent').textContent = 'see all';
			} else {
				document.getElementById('see_all_recent').textContent = 'hide';
			}
		},

		async playlist(id) {
			if (this.nav_show) {
				this.toggleNav();
			}
			this.setID = id;
			await axios
				.get('https://us-central1-streamer-22d50.cloudfunctions.net/getMusicOfGenre?genre=' + id)
				.then((res) => {
					// console.log(res.data);
					let data = [];
					res.data.forEach((ele) => {
						let obj = {
							artist: ele.artist,
							file: ele.downloadUrl,
							genre: ele.genre,
							id: ele.id,
							title: ele.title,
							src: ele.imageUrl,
						};
						data.push(obj);
					});
					this.recents = data;

					if (data.length >= 12) this.tempRecents = data.slice(0, 12);
					else this.tempRecents = data;

					if (document.getElementById(this.currentPlaying.id + 'hover-recent') !== null) {
						document
							.getElementById(this.currentPlaying.id + 'hover-recent')
							.classList.remove('opacity-100');
						document.getElementById(this.currentPlaying.id + 'hover-recent').classList.add('opacity-0');
						document.getElementById(
							this.currentPlaying.id + 'recent'
						).innerHTML = `<i class="material-icons text-2xl pt-1" style="color: white;">play_arrow</i>`;
					}

					if (document.getElementById(this.currentPlaying.id + 'hover') !== null) {
						document.getElementById(this.currentPlaying.id + 'hover').classList.remove('opacity-0');
						document.getElementById(this.currentPlaying.id + 'hover').classList.add('opacity-100');
						document.getElementById(
							this.currentPlaying.id
						).innerHTML = `<i class="material-icons text-2xl pt-1" style="color: white;padding-left:145px;">stop_arrow</i>`;
					}

					document.getElementById('recents_head').textContent = id.charAt(0).toUpperCase() + id.slice(1);
					this.showRedirect = false;
				});
		},

		favFun() {
			if (this.nav_show) {
				this.toggleNav();
			}
			this.setID = 'favorite';
			this.fav = [];

			if (JSON.parse(localStorage.getItem('fav_tracks')) === null) {
				let fav_tracks = [];
				localStorage.setItem('fav_tracks', JSON.stringify(fav_tracks));
			} else {
				let fav_tracks = JSON.parse(localStorage.getItem('fav_tracks'));
				if (fav_tracks.length > 0) {
					for (let i = 0; i < fav_tracks.length; i++) {
						for (let j = 0; j < this.customs.length; j++) {
							if (this.customs[j].id === fav_tracks[i]) {
								this.customs[j].fav = true;
								this.fav.unshift(this.customs[j]);
								break;
							}
						}
					}
				} else {
					console.log('No fav tracks');
				}
			}

			this.recents = this.fav;

			if (this.fav.length >= 12) this.tempRecents = this.fav.slice(0, 12);
			else this.tempRecents = this.fav;

			if (document.getElementById(this.currentPlaying.id + 'hover-recent') !== null) {
				document.getElementById(this.currentPlaying.id + 'hover-recent').classList.remove('opacity-100');
				document.getElementById(this.currentPlaying.id + 'hover-recent').classList.add('opacity-0');
				document.getElementById(
					this.currentPlaying.id + 'recent'
				).innerHTML = `<i class="material-icons text-2xl pt-1" style="color: white;">play_arrow</i>`;
			}

			if (document.getElementById(this.currentPlaying.id + 'hover') !== null) {
				document.getElementById(this.currentPlaying.id + 'hover').classList.remove('opacity-0');
				document.getElementById(this.currentPlaying.id + 'hover').classList.add('opacity-100');
				document.getElementById(
					this.currentPlaying.id
				).innerHTML = `<i class="material-icons text-2xl pt-1" style="color: white;padding-left:145px;">stop_arrow</i>`;
			}

			document.getElementById('recents_head').textContent = "Your's Favorite";
			this.showRedirect = false;
		},
		sideNavs(id) {
			this.setID = id;
			if (id === 'home') {
				// handle recents
				if (JSON.parse(localStorage.getItem('recent_tracks')) === null) {
					let recent_tracks = [];
					localStorage.setItem('recent_tracks', JSON.stringify(recent_tracks));
				} else {
					let recent_tracks = JSON.parse(localStorage.getItem('recent_tracks'));
					if (recent_tracks.length > 0) {
						this.recents = [];
						this.tempRecents = [];
						for (let i = 0; i < recent_tracks.length; i++) {
							for (let j = 0; j < this.customs.length; j++) {
								if (this.customs[j].id === recent_tracks[i]) {
									this.recents.push(this.customs[j]);
									if (i < 12) {
										this.tempRecents.push(this.customs[j]);
									}
									break;
								}
							}
						}
					} else {
						console.log('No recent tracks');
					}
				}
				document.getElementById('recents_head').textContent = 'Recent Played';
				this.showRedirect = false;
			} else if (id === 'add') {
				window.open('https://streamer-22d50.web.app/');
				this.showRedirect = true;
				setTimeout(() => {
					document.getElementById('redirect_head1').textContent = 'You have been redirected :)';
					document.getElementById('redirect_head2').textContent = 'Avoid song repetition while uploading :)';
					document.getElementById('redirect_head3').textContent = '<click here> If not redirected';
				}, 2000);
			}

			this.toggleNav();
		},
		updateSelectedIndex(id) {
			this.stop(this.currentPlaying.id);
			this.startAndSet(id);
		},
		clickOnPlay(id) {
			if (sessionStorage.getItem('recent_active') === 'true') {
				document.getElementById(id + 'hover-recent').classList.remove('opacity-0');

				document.getElementById(id + 'hover-recent').classList.add('opacity-100');

				document.getElementById(
					id + 'recent'
				).innerHTML = `<i class="material-icons text-2xl pt-1" style="color: white;padding-left:145px;">stop_arrow</i>`;
			} else {
				document.getElementById(id + 'hover').classList.remove('opacity-0');

				document.getElementById(id + 'hover').classList.add('opacity-100');

				document.getElementById(
					id
				).innerHTML = `<i class="material-icons text-2xl pt-1" style="color: white;padding-left:145px;">stop_arrow</i>`;
			}
		},
		clickOnPause(id) {
			if (
				sessionStorage.getItem('recent_active') === 'true' &&
				document.getElementById(id + 'hover-recent') != null
			) {
				document.getElementById(id + 'hover-recent').classList.remove('opacity-100');
				document.getElementById(id + 'hover-recent').classList.add('opacity-0');
				document.getElementById(
					id + 'recent'
				).innerHTML = `<i class="material-icons text-2xl pt-1" style="color: white;">play_arrow</i>`;
			} else {
				if (document.getElementById(id + 'hover') !== null) {
					document.getElementById(id + 'hover').classList.remove('opacity-100');
					document.getElementById(id + 'hover').classList.add('opacity-0');
					document.getElementById(
						id
					).innerHTML = `<i class="material-icons text-2xl pt-1" style="color: white;">play_arrow</i>`;
				}
			}
		},
		closeMusic() {
			this.stop(this.currentPlaying.id);
			this.currentPlaying.playing = false;
			this.closePlayer = true;

			document.getElementById('play_bar').classList.remove('high_z_index');
			document.getElementById('top_main').classList.remove('s_height');
			document.getElementById('play_bar').classList.add('low_z_index');
			document.getElementById('top_main').classList.add('l_height');
		},

		showplayer() {
			if (!this.player) {
				let div = document.getElementsByClassName('player-div')[0].style;
				div.position = 'absolute';
				div.visibility = 'visible';
				div.opacity = '1';
				div.transform = 'translateY(0%)';

				document.getElementById('arrow_btn_tog').textContent = 'arrow_drop_down';
			} else {
				let div = document.getElementsByClassName('player-div')[0].style;
				div.visibility = 'hidden';
				div.opacity = '0';
				div.transform = 'translateY(100%)';
				document.getElementById('arrow_btn_tog').textContent = 'arrow_drop_up';
			}

			this.player = !this.player;
		},

		toggleNav() {
			if (!this.nav) {
				let div = document.getElementsByClassName('side-nav-div')[0].style;
				div.visibility = 'visible';
				div.opacity = '1';
				div.transform = 'translateX(0%)';
			} else {
				let div = document.getElementsByClassName('side-nav-div')[0].style;
				div.visibility = 'hidden';
				div.opacity = '0';
				div.transform = 'translateX(-100%)';
			}

			setTimeout(() => {
				this.nav_show = !this.nav_show;
			}, 350);

			this.nav = !this.nav;
		},

		// Handling music play

		startAndSet(id) {
			// start clicked music
			this.start(id);

			let music = [];

			if (sessionStorage.getItem('recent_active') === 'true') {
				music = [...this.recents].filter((ele) => {
					return ele.id === id;
				});
			} else {
				music = [...this.customs].filter((ele) => {
					return ele.id === id;
				});
			}

			this.currentPlaying = music[0];
			// console.log(music,id)
			this.currentPlaying.playing = true;
		},

		start(id) {
			if (
				sessionStorage.getItem('recent_active') === 'true' &&
				document.getElementById(id + 'hover-recent') != null
			) {
				document.getElementById(id + 'hover-recent').classList.remove('opacity-0');

				document.getElementById(id + 'hover-recent').classList.add('opacity-100');

				document.getElementById(
					id + 'recent'
				).innerHTML = `<i class="material-icons text-2xl pt-1" style="color: white;padding-left:145px;">stop_arrow</i>`;
			} else {
				if (document.getElementById(id + 'hover') !== null) {
					document.getElementById(id + 'hover').classList.remove('opacity-0');
					document.getElementById(id + 'hover').classList.add('opacity-100');
					document.getElementById(
						id
					).innerHTML = `<i class="material-icons text-2xl pt-1" style="color: white;padding-left:145px;">stop_arrow</i>`;
				}
			}
			this.currentPlaying.playing = true;
		},

		stop(id) {
			if (
				sessionStorage.getItem('recent_active') === 'true' &&
				document.getElementById(id + 'hover-recent') !== null
			) {
				document.getElementById(id + 'hover-recent').classList.remove('opacity-100');
				document.getElementById(id + 'hover-recent').classList.add('opacity-0');
				document.getElementById(
					id + 'recent'
				).innerHTML = `<i class="material-icons text-2xl pt-1" style="color: white;">play_arrow</i>`;
			} else {
				if (document.getElementById(id + 'hover') !== null) {
					document.getElementById(id + 'hover').classList.remove('opacity-100');
					document.getElementById(id + 'hover').classList.add('opacity-0');
					document.getElementById(
						id
					).innerHTML = `<i class="material-icons text-2xl pt-1" style="color: white;">play_arrow</i>`;
				}
			}
			this.currentPlaying.playing = false;
		},

		stopStartAndSet(id) {
			if (
				sessionStorage.getItem('recent_active') === 'true' &&
				document.getElementById(this.currentPlaying.id + 'recent') !== null
			) {
				document.getElementById(
					this.currentPlaying.id + 'recent'
				).innerHTML = `<i class="material-icons text-2xl pt-1" style="color: white;">play_arrow</i>`;

				document.getElementById(this.currentPlaying.id + 'hover-recent').classList.remove('opacity-100');

				document.getElementById(this.currentPlaying.id + 'hover-recent').classList.add('opacity-0');
			} else {
				// stop playing song
				document.getElementById(
					this.currentPlaying.id
				).innerHTML = `<i class="material-icons text-2xl pt-1" style="color: white;">play_arrow</i>`;

				document.getElementById(this.currentPlaying.id + 'hover').classList.remove('opacity-100');

				document.getElementById(this.currentPlaying.id + 'hover').classList.add('opacity-0');
			}

			this.start(id);

			// set playing song
			let music = [];

			if (sessionStorage.getItem('recent_active') === 'true') {
				music = [...this.recents].filter((ele) => {
					return ele.id === id;
				});
			} else {
				music = [...this.customs].filter((ele) => {
					return ele.id === id;
				});
			}

			this.currentPlaying = music[0];
			this.currentPlaying.playing = true;
		},

		async recentPlay(recent_id) {
			sessionStorage.setItem('recent_active', true);
			this.closePlayer = false;
			document.getElementById('play_bar').classList.remove('low_z_index');
			document.getElementById('top_main').classList.remove('l_height');
			document.getElementById('play_bar').classList.add('high_z_index');
			document.getElementById('top_main').classList.add('s_height');

			//  resetting ui of custom
			if (this.currentPlaying.id !== null && document.getElementById(this.currentPlaying.id) !== null) {
				document.getElementById(
					this.currentPlaying.id
				).innerHTML = `<i class="material-icons text-2xl pt-1" style="color: white;">play_arrow</i>`;

				document.getElementById(this.currentPlaying.id + 'hover').classList.remove('opacity-100');
				document.getElementById(this.currentPlaying.id + 'hover').classList.add('opacity-0');
			}

			let id = recent_id.substring(0, recent_id.length - 6);

			if (this.currentPlaying.id === null) {
				this.startAndSet(id);
			} else {
				if (this.currentPlaying.playing && this.currentPlaying.id === id) {
					this.stop(id);
				} else if (this.currentPlaying.playing && this.currentPlaying.id !== id) {
					this.stopStartAndSet(id);
				} else if (!this.currentPlaying.playing && this.currentPlaying.id === id) {
					this.start(id);
				} else if (!this.currentPlaying.playing && this.currentPlaying.id !== id) {
					this.startAndSet(id);
				}
			}

			if (this.currentPlaying.playing) {
				this.setRecent();

				let arrList = [...this.recents];
				let index = arrList.findIndex((item) => item.id === this.currentPlaying.id);

				if (index >= 0) {
					await axios
						.get(
							'https://us-central1-streamer-22d50.cloudfunctions.net/getMusicOfGenre?genre=' +
								this.currentPlaying.genre
						)
						.then((res) => {
							this.playList = arrList.splice(index);
							res.data.forEach((ele) => {
								let idx = this.playList.findIndex((item) => item.id === ele.id);

								if (idx < 0) {
									let obj = {
										artist: ele.artist,
										file: ele.downloadUrl,
										genre: ele.genre,
										id: ele.id,
										title: ele.title,
										src: ele.imageUrl,
									};
									this.playList.push(obj);
								}
							});
						});
				}
			}
		},

		async customPlay(id) {
			sessionStorage.setItem('recent_active', false);
			this.closePlayer = false;
			document.getElementById('play_bar').classList.add('high_z_index');
			document.getElementById('top_main').classList.add('s_height');
			document.getElementById('play_bar').classList.remove('low_z_index');
			document.getElementById('top_main').classList.remove('l_height');

			// on click remove ui from recent
			if (
				this.currentPlaying.id !== null &&
				document.getElementById(this.currentPlaying.id + 'recent') !== null
			) {
				document.getElementById(
					this.currentPlaying.id + 'recent'
				).innerHTML = `<i class="material-icons text-2xl pt-1" style="color: white;">play_arrow</i>`;

				document.getElementById(this.currentPlaying.id + 'hover-recent').classList.remove('opacity-100');
				document.getElementById(this.currentPlaying.id + 'hover-recent').classList.add('opacity-0');
			}

			if (this.currentPlaying.id === null) {
				this.startAndSet(id);
			} else {
				if (this.currentPlaying.playing && this.currentPlaying.id === id) {
					this.stop(id);
				} else if (this.currentPlaying.playing && this.currentPlaying.id !== id) {
					this.stopStartAndSet(id);
				} else if (!this.currentPlaying.playing && this.currentPlaying.id === id) {
					this.start(id);
				} else if (!this.currentPlaying.playing && this.currentPlaying.id !== id) {
					this.startAndSet(id);
				}
			}

			if (this.currentPlaying.playing) {
				this.setRecent();

				let arrList = [...this.customs];
				let index = arrList.findIndex((item) => item.id === this.currentPlaying.id);

				if (index >= 0) {
					await axios
						.get(
							'https://us-central1-streamer-22d50.cloudfunctions.net/getMusicOfGenre?genre=' +
								this.currentPlaying.genre
						)
						.then((res) => {
							console.log(res.data);
							this.playList = arrList.splice(index);
							res.data.forEach((ele) => {
								let idx = this.playList.findIndex((item) => item.id === ele.id);

								if (idx < 0) {
									let obj = {
										artist: ele.artist,
										file: ele.downloadUrl,
										genre: ele.genre,
										id: ele.id,
										title: ele.title,
										src: ele.imageUrl,
									};
									this.playList.push(obj);
								}
							});
						});
				}
			}
		},
		setRecent() {
			// add data in recents track
			let index_in_recent_tracks = JSON.parse(localStorage.getItem('recent_tracks')).indexOf(
				this.currentPlaying.id
			);
			if (index_in_recent_tracks < 0) {
				let recent_tracks = [...JSON.parse(localStorage.getItem('recent_tracks'))];
				recent_tracks.unshift(this.currentPlaying.id);
				localStorage.setItem('recent_tracks', JSON.stringify(recent_tracks));
			} else {
				let recent_tracks = [
					...JSON.parse(localStorage.getItem('recent_tracks')).filter((ele) => {
						return ele !== this.currentPlaying.id;
					}),
				];

				recent_tracks.unshift(JSON.parse(localStorage.getItem('recent_tracks'))[index_in_recent_tracks]);
				localStorage.setItem('recent_tracks', JSON.stringify(recent_tracks));
			}
		},

		setFav(e) {
			let arr_id = e.target.id.split('-');
			let fav_tracks = JSON.parse(localStorage.getItem('fav_tracks'));

			if (fav_tracks.indexOf(arr_id[0]) >= 0) {
				let new_fav_tracks = fav_tracks.filter((ele) => {
					return ele !== arr_id[0];
				});

				let index_fav_custom = this.customs.findIndex((item) => item.id === arr_id[0]);
				this.customs[index_fav_custom].fav = false;

				localStorage.setItem('fav_tracks', JSON.stringify(new_fav_tracks));

				if (arr_id[2] === 'custom') {
					document.getElementById(arr_id[0] + '-fav-custom').parentElement.classList.remove('bgWhite');
					document.getElementById(arr_id[0] + '-fav-custom').classList.remove('colorRed');
				} else {
					if (document.getElementById(arr_id[0] + '-fav-recent') !== null) {
						document.getElementById(arr_id[0] + '-fav-recent').parentElement.classList.remove('bgWhite');
						document.getElementById(arr_id[0] + '-fav-recent').classList.remove('colorRed');
					}
				}
			} else {
				fav_tracks.push(arr_id[0]);

				localStorage.setItem('fav_tracks', JSON.stringify(fav_tracks));

				if (arr_id[2] === 'custom') {
					document.getElementById(arr_id[0] + '-fav-custom').parentElement.classList.add('bgWhite');
					document.getElementById(arr_id[0] + '-fav-custom').classList.add('colorRed');
				} else {
					if (document.getElementById(arr_id[0] + '-fav-recent') !== null) {
						document.getElementById(arr_id[0] + '-fav-recent').parentElement.classList.add('bgWhite');
						document.getElementById(arr_id[0] + '-fav-recent').classList.add('colorRed');
					}
				}
			}

			if (this.setID === 'favorite') {
				this.favFun();
			}
		},
	},

	async mounted() {
		await axios
			.get('https://us-central1-streamer-22d50.cloudfunctions.net/getMusic')
			.then((response) => {
				// handle success
				for (let i = 0; i < response.data.length; i++) {
					let ele = response.data[i];
					let obj = {
						artist: ele.artist,
						file: ele.downloadUrl,
						genre: ele.genre,
						id: ele.id,
						title: ele.title,
						src: ele.imageUrl,
					};

					this.all_songs++;

					if (ele.genre === 'love') this.love_songs++;

					if (ele.genre === 'party') this.party_songs++;

					if (ele.genre === 'hip-hop') this.hip_hop_songs++;

					if (ele.genre === 'classical') this.classical_songs++;

					if (ele.genre === 'pop') this.pop_songs++;

					if (ele.genre === 'rock') this.rock_songs++;

					if(ele.genre === 'sad') this.sad_songs++

					let fav_tracks = JSON.parse(localStorage.getItem('fav_tracks'));
					if (fav_tracks !== null && fav_tracks.indexOf(ele.id) >= 0) {
						obj.fav = true;
					} else {
						obj.fav = false;
					}
					this.customs.push(obj);
					if (i < 24) {
						this.tempCustoms.push(obj);
					}
				}
			})
			.catch(function (error) {
				// handle error
				console.log(error);
			});

		// handle recents
		if (JSON.parse(localStorage.getItem('recent_tracks')) === null) {
			let recent_tracks = [];
			localStorage.setItem('recent_tracks', JSON.stringify(recent_tracks));
		} else {
			let recent_tracks = JSON.parse(localStorage.getItem('recent_tracks'));
			if (recent_tracks.length > 0) {
				for (let i = 0; i < recent_tracks.length && i <= 50; i++) {
					// only 50 records
					for (let j = 0; j < this.customs.length; j++) {
						if (this.customs[j].id === recent_tracks[i]) {
							this.recents.push(this.customs[j]);
							if (i < 12) {
								this.tempRecents.push(this.customs[j]);
							}
							break;
						}
					}
				}
			} else {
				console.log('No recent tracks');
			}
		}

		//handle fav
		if (JSON.parse(localStorage.getItem('fav_tracks')) === null) {
			let fav_tracks = [];
			localStorage.setItem('fav_tracks', JSON.stringify(fav_tracks));
		} else {
			let fav_tracks = JSON.parse(localStorage.getItem('fav_tracks'));
			if (fav_tracks.length > 0) {
				for (let i = 0; i < fav_tracks.length; i++) {
					for (let j = 0; j < this.customs.length; j++) {
						if (this.customs[j].id === fav_tracks[i]) {
							this.fav.unshift(this.customs[j]);
							break;
						}
					}
				}
			} else {
				console.log('No fav tracks');
			}
		}
	},

	created() {
		var x = window.scrollX;
		var y = window.scrollY;
		window.onscroll = function () {
			window.scrollTo(x, y);
		};
	},
};
</script>

<style>
::selection {
	color: none;
	background: none;
}
/* For Mozilla Firefox */
::-moz-selection {
	color: none;
	background: none;
}

button {
	outline: none !important;
}
.s_height {
	height: 90vh;
}
.l_height {
	height: 100vh;
}
.low_z_index {
	z-index: -9999;
}
.high_z_index {
	z-index: 9999;
}

.player-div {
	visibility: hidden;
	opacity: 0;
	transform: translateY(100%);
	transition: all 0.3s ease-out;
}
.side-nav-div {
	visibility: visible;
	opacity: 1;
	transform: translateX(0%);
	transition: all 0.3s ease-out;
}
.html {
	overflow-x: hidden;
	overflow-y: scroll;
	-ms-overflow-style: none; /* Internet Explorer 10+ */
}
body {
	overflow-x: hidden;
	overflow-y: hidden;
}
html::-webkit-scrollbar {
	/* WebKit */
	width: 0;
	height: 0;
}

.no-select {
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	-webkit-tap-highlight-color: transparent;
}

.bgWhite {
	background: white !important;
}
.colorRed {
	color: red !important;
}

@media (max-width: 420px) {
	.flex_div > div {
		flex: 1 0 50%;
	}

	.flex_div > div:first-child {
		flex: 0 1 100%;
	}

	/*.flex_div > div:first-child > div > img {
		width: 80% !important;
		display: block;
		margin:auto auto;
		
	}*/
}
</style>
