// %%%%%%%%% launch options %%%%%%%%%%%%


window.eaglercraftXOpts = {
	container: "game_frame",
	worldsDB: "worlds",
    servers:
[
  { addr: 'wss://mc.arch.lol', name: 'ArchMC' },
  { addr: 'wss://vanillamc.me', name: 'VanillaMC Legacy' },
  { addr: 'wss://clever-teaching.com', name: 'Clever Teaching' },
  { addr: 'wss://mc.asspixel.net', name: 'Asspixel Network' },
  { addr: 'wss://mc.ricenetwork.xyz', name: 'Rice Network' },
  { addr: 'wss://colbster937.dev', name: '✫ WebMC OneBlock ✫' },
  { addr: 'wss://mc.time-legacy.net/', name: 'TimeLegacy' },
  { addr: 'wss://eagler.nobnot.org', name: 'noBnoT Anarchy' },
  { addr: 'wss://cbnet.lol', name: 'Cheeseburger Network' },
  { addr: 'wss://communistmc.xyz', name: '☭ CommunistMC ☭' },
  { addr: 'wss://play.acentramc.com', name: 'AcentraMC' },
  { addr: 'wss://ethereal.mov', name: 'Ethereal' },
  { addr: 'wss://blobcraft.club', name: 'BlobCraft' },
  { addr: 'wss://ws.neutine.net', name: 'Wisteria SMP ' },
  { addr: 'wss://mc.lamplifesteal.xyz', name: 'Lifesteal' },
  { addr: 'wss://bedw3tr.minecraft.pe', name: '🇧 🇪 🇩 🇼 🇪 🇹 🇷 ' },
  { addr: 'wss://play.ragexwaternet.online', name: 'Water Network' },
  {
    addr: 'wss://zentic.cc',
    name: 'Zentic Network ⚡ ​​🇩​​🇺​​🇪​​🇱​​🇸​ ﹢ ​🇸​​🇰​​🇾​​🇼​​🇦​​🇷​​🇸​ ﹢ ​🇧​​🇪​​🇩​​🇼​​🇦​​🇷​​🇸​'
  },
  { addr: 'wss://join.suckmycraft.online/', name: 'SuckMyCraft' },
  { addr: 'wss://poison.rocks', name: 'Poison Anarchy' },
  { addr: 'wss://asianfarmer.lol', name: 'AsianF4rmer' },
  { addr: 'wss://play.galaxyprisons.com', name: 'GalaxyPrisons' },
  { addr: 'wss://mc.zyth.me', name: 'ZythMC' },
  { addr: 'wss://hey.ctm.com.ar', name: 'The Builders SMP' },
  { addr: 'wss://eagler.eaglesmp.org', name: 'EagleSMP' },
  { addr: 'wss://web.aesthetiful.com', name: 'AnarchMC' },
  { addr: 'wss://wapnetwork.net', name: 'WAP Network' },
  { addr: 'wss://play.penguin.rent', name: 'PenguinMC' },
  { addr: 'wss://mc.theludos.com/', name: "Myth's EagMP" },
  {
    addr: 'wss://egg.adscraft.org',
    name: 'ADSCRAFT / The Porcupine Network'
  },
  { addr: 'wss://via.shhnowisnottheti.me', name: 'ViaProxyShared' },
  { addr: 'wss://eg.neutine.net', name: 'Neutine Network' },
  { addr: 'wss://sus.shhnowisnottheti.me', name: 'creayun / ayunboom' },
  { addr: 'wss://snowmcis.betterthanarchmc.lol', name: 'SnowMC' },
  { addr: 'wss://eagler.plebmc.top', name: 'PlebMc' },
  { addr: 'wss://mc.smgoro.com', name: 'SMGoro Server' },
  { addr: 'wss://nationalismmc.minecraft.pe', name: 'NationalismMC' },
  { addr: 'wss://ec.mainbird.org', name: 'Mainbird Practice' },
  { addr: 'wss://x.mess.eu.org', name: 'MessCraftX' }
]
,
	relays: [
		{ addr: "wss://relay.deev.is/", comment: "lax1dude relay #1", primary: relayId == 0 },
		{ addr: "wss://relay.lax1dude.net/", comment: "lax1dude relay #2", primary: relayId == 1 },
		{ addr: "wss://relay.shhnowisnottheti.me/", comment: "ayunami relay #1", primary: relayId == 2 }
	]
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%