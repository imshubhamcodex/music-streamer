<template>
	<div class="container-box">
		<div class="bg-dark h-screen">
			<div class="flex" style="height: 90vh">
				<!--side nav -->
				<div v-show="nav_show" class="w-56 bg-black h-full flex-none side-nav-div">
					<div class="p-6 flex item center justify-between">
						<h1 class="text-xl font-bold text-white">Music Archive</h1>
					</div>
					<div class="mx-2" style="color: white">
						<button
							v-for="page in pages"
							:key="page.id"
							@click="setID = page.id"
							:class="`w-full text-xs font-semibold rounded px-3 py-2 my-2 flex items-center justify-start ${
								setID === page.id ? 'bg-light text-white' : 'text-lighest'
							}`"
						>
							<i class="material-icons mr-3">{{ page.icon }}</i>
							<p>{{ page.name }}</p>
						</button>
					</div>
					<div class="mx-2" style="color: white">
						<h1 class="text-xs text-lightest tracking-widget uppercase">Playlist</h1>
						<button
							@click="setID = 'favorite'"
							:class="` mt-2 w-full text-xs font-semibold rounded px-3 py-2 flex items-center justify-start ${
								setID === 'favorite' ? 'bg-light text-white' : 'text-lighest'
							}`"
						>
							<i class="material-icons mr-3">favorite</i>
							<p>Favorite</p>
						</button>
					</div>
					<div class="h-px w-full bg-light my-3"></div>
					<div class="mx-5" style="color: white">
						<button
							class="px-3 py-2 hover:text-white hover:text-white"
							style="zoom: 0.5; width: 50px; height: 50px; border-radius: 50%; border: 1px solid white"
						>
							<i class="material-icons mr-3 text-sm" style="zoom: 1.5">arrow_downward</i>
						</button>
						<span class="px-3 text-sm font-semibold text-lightest hover:text-white" style="cursor: pointer"
							>Install App</span
						>
					</div>
					<div class="relative pt-8">
						<div class="flex items-center justify-start pl-2">
							<img src="./assets/Vue_Logo.png" style="width: 200px" alt="playing music" />
						</div>
						<h1 class="pl-2 text-sm font-semibold text-white tracking wide">Currently Playing Song Name</h1>
						<h2 class="pl-2 text-xs text-lightest text-white tracking wide">Artist Name</h2>
					</div>
				</div>

				<!--main content -->
				<div class="w-full h-full relative" style="color: white; overflow-y: auto">
					<!--header -->
					<div class="bg-dark w-full sticky top-0 p-2 h-16" style="z-index: 99">
						<!-- <button class="px-3 py-2 mt-5 ml-2 hover:text-white hover:text-white">
							<i @click="toggleNav()" class="material-icons mr-3 text-white">menu</i>
						</button> -->
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

						<div style="float: right">
							<button
								@click="showDropdown = !showDropdown"
								class="
									px-3
									py-2
									mt-3
									ml-2
									rounded-full
									flex
									items-center
									hover:text-white hover:text-white
								"
								style="zoom: 0.7; border: 1px solid white"
							>
								<img src="./assets/Vue_Logo.png" class="rounded-full h-6 w-6" />
								<span class="text-white font-semibold text-xs ml-2" style="zoom: 1.5"
									>Username abc</span
								>
								<i class="material-icons ml-2" style="color: white">arrow_drop_down</i>
							</button>
							<div class="mt-1" v-if="showDropdown">
								<button
									class="w-full bg-light text-white text-xs px-3 py-2 flex items-center justify-start"
								>
									<i class="material-icons mr-3">logout</i>
									<p>Logout</p>
								</button>
								<button
									class="w-full bg-light text-white text-xs px-3 py-2 flex items-center justify-start"
								>
									<i class="material-icons mr-3">login</i>
									<p>Login</p>
								</button>
							</div>
						</div>
					</div>
					<!--header end-->

					<!--cards recent played -->
					<div class="px-6 py-5">
						<div class="px-3 py-1 flex item center justify-between">
							<h1 class="text-2xl font-semibold text-white tracking-wider">Recent Played</h1>
							<h2 class="text-xs font-semibold text-white tracking-wider hover:underline uppercase">
								see all
							</h2>
						</div>
						<div class="w-full flex flex-wrap flex_div">
							<div class="p-2 w-48 relative" v-for="(recent, index) in recents" :key="index + 'recent'">
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
									style="cursor: pointer"
								>
									<div class="bg-green rounded-full h-10 w-10 flex item center justify-center">
										<i class="material-icons text-2xl pt-1" style="color: white">play_arrow</i>
									</div>
								</div>
								<div class="bg-light w-full h-auto p-5">
									<img
										:src="require(`@/assets/${recent.src}.png`)"
										class="w-full h-auto shadow rounded mb-2"
									/>
									<h1 class="text-sm font-semibold text-white tracking wide">
										{{ recent.title }}
									</h1>
									<h2 class="text-xs text-lightest text-white tracking wide">
										{{ recent.artist }}
									</h2>
								</div>
							</div>
						</div>
					</div>
					<!--cards recent played  close-->

					<!--cards made for you -->
					<div class="px-6 py-5">
						<div class="px-3 py-1 flex item center justify-between">
							<h1 class="text-2xl font-semibold text-white tracking-wider">Made for You</h1>
							<h2 class="text-xs font-semibold text-white tracking-wider hover:underline uppercase">
								see all
							</h2>
						</div>
						<h2 class="ml-2 mb-1 text-xs text-lightest text-white tracking-wider">
							Get better recommendation more you listen
						</h2>
						<div class="w-full flex flex-wrap flex_div">
							<div class="p-2 w-48 relative" v-for="(custom, index) in customs" :key="index + 'customes'">
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
									style="cursor: pointer"
								>
									<div class="bg-green rounded-full h-10 w-10 flex item center justify-center">
										<i class="material-icons text-2xl pt-1" style="color: white">play_arrow</i>
									</div>
								</div>
								<div class="bg-light w-full h-auto p-5">
									<img
										:src="require(`@/assets/${custom.src}.png`)"
										class="w-full h-auto shadow rounded mb-2"
									/>
									<h1 class="text-sm font-semibold text-white tracking wide">
										{{ custom.title }}
									</h1>
									<h2 class="text-xs text-lightest text-white tracking wide">
										{{ custom.artist }}
									</h2>
								</div>
							</div>
						</div>
					</div>
					<!--cards made for you close -->
				</div>
			</div>
			<!--play bar -->
			<div class="w-full bg-light" style="height: 10vh; color: white">
				<div class="px-3 py-1 flex item center justify-between">
					<div class="relative">
						<div class="flex items-center justify-center pl-2">
							<img src="./assets/Vue_Logo.png" class="w-15 h-12 shadow pt-2 mt-1" alt="playing music" />
							<h1 class="pl-2 text-sm font-semibold text-white tracking wide">
								Currently Playing Song Name
							</h1>
							<h2 class="pl-2 text-xs text-lightest text-white tracking wide">Artist Name</h2>
						</div>
					</div>
					<div class="flex item center justify-around">
						<i
							@click="showplayer()"
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
		<div class="bg-dark player-div" style="position: absolute; top: 0; height: 50vh; width: 100vw; z-index: 100">
			<Player style="z-index: 100" />
		</div>
		<!-- <router-view /> -->
	</div>
</template>

<script>
import Player from './components/Home.vue';
export default {
	components: {
		Player,
	},
	data() {
		return {
			pages: [
				{ id: 'home', name: 'Home', icon: 'home' },
				{ id: 'search', name: 'Search', icon: 'search' },
				{ id: 'Library', name: 'Your Library', icon: 'bar_chart' },
			],
			setID: 'home',
			showDropdown: false,
			recents: [
				{ src: 'Vue_Logo', title: 'Title - recent', artist: 'Shubham' },
				{ src: 'Vue_Logo', title: 'Title - recent', artist: 'Shubham' },
				{ src: 'Vue_Logo', title: 'Title - recent', artist: 'Shubham' },
				{ src: 'Vue_Logo', title: 'Title - recent', artist: 'Shubham' },
				{ src: 'Vue_Logo', title: 'Title - recent', artist: 'Shubham' },
				{ src: 'Vue_Logo', title: 'Title - recent', artist: 'Shubham' },
				{ src: 'Vue_Logo', title: 'Title - recent', artist: 'Shubham' },
			],
			customs: [
				{ src: 'Vue_Logo', title: 'Title - customs', artist: 'Shubham' },
				{ src: 'Vue_Logo', title: 'Title - customs', artist: 'Shubham' },
				{ src: 'Vue_Logo', title: 'Title - customs', artist: 'Shubham' },
				{ src: 'Vue_Logo', title: 'Title - customs', artist: 'Shubham' },
				{ src: 'Vue_Logo', title: 'Title - customs', artist: 'Shubham' },
				{ src: 'Vue_Logo', title: 'Title - customs', artist: 'Shubham' },
				{ src: 'Vue_Logo', title: 'Title - customs', artist: 'Shubham' },
			],

			player: false,
			nav: true,
			nav_show: true,
		};
	},
	methods: {
		closeMusic(){
			console.log("close")
		},
		showplayer() {
			if (!this.player) {
				let div = document.getElementsByClassName('player-div')[0].style;
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
		getImg(obj) {
			console.log(obj);
			return obj.src;
		},
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
button {
	outline: none !important;
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
	overflow-y: scroll;
	scrollbar-width: none; /* Firefox */
	-ms-overflow-style: none; /* Internet Explorer 10+ */
}
html::-webkit-scrollbar {
	/* WebKit */
	width: 0;
	height: 0;
}

@media (max-width: 420px) {
	.flex_div > div {
		flex: 1 0 50%;
	}

	.flex_div > div:first-child {
		flex: 0 1 100%;
	}
}
</style>
