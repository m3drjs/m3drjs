import { Song } from '../types';

export const initialSongs: Song[] = [
  {
    id: 'song-1',
    slug: 'koraputia-chokda-dhemsa',
    title: 'Koraputia Chokda Dhemsa',
    desiaTitle: 'କୋରାପୁଟିଆ ଚୋକ୍ଡ଼ା ଢେମ୍ସା',
    artist: 'Gurubari Muduli & Koraput Dhemsa Dal',
    artistId: 'artist-1',
    album: 'Dhemsa Taranga Vol. 1',
    category: 'Dhemsa',
    district: 'Koraput',
    duration: 28,
    audioUrl: '/audio/koraputia-chokda-dhemsa.wav',
    artworkUrl: '/images/artwork/koraputia-chokda.svg',
    tempoBpm: 132,
    danceType: 'Chokda Dhemsa (Fast 16-step circular stomp)',
    year: 2024,
    playCount: 18429,
    featured: true,
    instruments: ['Mahuri', 'Tamak', 'Nishan', 'Dhol', 'Ghungroo'],
    culturalStory: 'Chokda Dhemsa is the most electrifying of all Dhemsa movements. Dancers lock arms at the shoulders, forming an unbroken spiral chain that bends and snaps like a whip in response to the Mahuri lead. Originating in the Paroja and Gadaba villages around Koraput, this song is played when the night is deep and the community energy is at its absolute pinnacle.',
    lyrics: [
      {
        odia: 'ହୋରେ ଆମୋର କୋରାପୁଟ ମାଟି ରେ... ଢେମ୍ସା ନାଚି ଆସୋ ରେ !',
        transliteration: 'Hore aamor Koraput maati re... Dhemsa naachi aaso re !',
        translation: 'O brothers and sisters of our Koraput soil, come join the Dhemsa dance circle!'
      },
      {
        odia: 'ମାହୁରୀ ବାଜିଲେ ମନ ନ ରହେ ଘରେ, ତାମାକ ତାଳେ ଗୋଡ଼ ଉଠେ ସଙ୍ଗେ !',
        transliteration: 'Mahuri baajile mana na rahe ghare, Tamak taale goda uthe sange !',
        translation: 'When the Mahuri sounds, no heart can remain indoors; our feet stomp in unison to the Tamak rhythm!'
      },
      {
        odia: 'ହାତ ଧରି ଧରି ବୁଲିବା ଚକ୍କର, ଏଇତ ଆମର ଦେଶିଆ ଧରମ୍ !',
        transliteration: 'Haata dhari dhari buliba chakkar, eita aamara Desia dharam !',
        translation: 'Hand in hand we trace the sacred circle; this is our Desia bond and way of life!'
      }
    ]
  },
  {
    id: 'song-2',
    slug: 'mandia-parab-geeta',
    title: 'Mandia Parab Geeta',
    desiaTitle: 'ମାଣ୍ଡିଆ ପରବ୍ ଗୀତ',
    artist: 'Laxman Bhatra & Nabarangpur Baunsi Ensemble',
    artistId: 'artist-2',
    album: 'Indravati Swara',
    category: 'Festival / Parab',
    district: 'Nabarangpur',
    duration: 28,
    audioUrl: '/audio/mandia-parab-geeta.wav',
    artworkUrl: '/images/artwork/mandia-parab.svg',
    tempoBpm: 116,
    danceType: 'Boda Dhemsa (Graceful swaying harvest step)',
    year: 2024,
    playCount: 14120,
    featured: true,
    instruments: ['Baunsi Flute', 'Dhol', 'Kathi Sticks', 'Tamak'],
    culturalStory: 'Mandia (Ragi / finger millet) is the life-sustaining grain of the South Odisha plateau. During the Parab harvest, the village elders gather with fresh crop offerings. The melody of the bamboo flute invokes gratitude to Mother Earth (Dharani Mata), transitioning into a warm swaying dance that celebrates food sovereignty and tribal resilience.',
    lyrics: [
      {
        odia: 'ମାଣ୍ଡିଆ କ୍ଷେତେ ସୁନା ଫଳିଲା, ଗାଁ ଯାକ ହସି ଉଠିଲା !',
        transliteration: 'Mandia kshete suna phalila, gaan jaaka hasi uthila !',
        translation: 'Golden grains have ripened in the millet fields; joy has spread across the entire village!'
      },
      {
        odia: 'ବାଉଁଶି ସୁରେ ଝରଣା ବହେ, ମାଟି ମା’କୁ ଜୁହାର କହେ !',
        transliteration: 'Baunsi sure jharana bahe, maati maaku juhaara kahe !',
        translation: 'Like a hillside spring the bamboo flute flows, offering reverence to the Earth Mother!'
      }
    ]
  },
  {
    id: 'song-3',
    slug: 'malkangiri-baha-dhemsa',
    title: 'Malkangiri Baha Dhemsa',
    desiaTitle: 'ମାଲକାନଗିରି ବାହା ଢେମ୍ସା',
    artist: 'Sukanti Pangi & Koya Rhythm Collective',
    artistId: 'artist-3',
    album: 'Sal Chhaya',
    category: 'Wedding / Baha',
    district: 'Malkangiri',
    duration: 28,
    audioUrl: '/audio/malkangiri-baha-dhemsa.wav',
    artworkUrl: '/images/artwork/malkangiri-baha.svg',
    tempoBpm: 138,
    danceType: 'Kundiguda Dhemsa (Joyous wedding hops & leaps)',
    year: 2023,
    playCount: 9870,
    featured: false,
    instruments: ['Nishan', 'Tamak', 'Ghungroo', 'Mahuri'],
    culturalStory: 'Baha Dhemsa is performed at wedding gatherings under the deep canopy of Sal forests in Malkangiri. As the groom and bride are welcomed with turmeric water and rice sprigs, the entire village lines up to celebrate unity between two families, dancing tirelessly until the morning sun breaks through the mist.',
    lyrics: [
      {
        odia: 'ନୂଆ ବୋହୂ ଆସେ ଶାଳ ବଣ ବାଟେ, ନିଶାନ ବାଜେ ଘନ ଘନ !',
        transliteration: 'Nua bohu aase Saala bana baate, Nishan baaje ghana ghana !',
        translation: 'The bride approaches along the Sal forest trail as the Nishan drum roars in celebration!'
      },
      {
        odia: 'ପାଏଲ ବାଜେ ଛମ୍ ଛମ୍, ନାଚୋ ନାଚୋ ସଙ୍ଗାତ ମନ !',
        transliteration: 'Paayela baaje chham chham, naacho naacho sangaata mana !',
        translation: 'Ankle bells chime chham-chham; dance on, beloved companions!'
      }
    ]
  },
  {
    id: 'song-4',
    slug: 'rayagada-mahuri-sur',
    title: 'Rayagada Mahuri Sur',
    desiaTitle: 'ରାୟଗଡ଼ା ମାହୁରୀ ସୁର',
    artist: 'Master Damodar Majhi',
    artistId: 'artist-4',
    album: 'Niyamgiri Echoes',
    category: 'Traditional',
    district: 'Rayagada',
    duration: 30,
    audioUrl: '/audio/rayagada-mahuri-sur.wav',
    artworkUrl: '/images/artwork/rayagada-mahuri.svg',
    tempoBpm: 104,
    danceType: 'Gedi Dhemsa (Contemplative twilight slow walk)',
    year: 2024,
    playCount: 22840,
    featured: true,
    instruments: ['Mahuri', 'Tudum', 'Ghanta'],
    culturalStory: 'Master Damodar Majhi demonstrates the classical mastery of the Desia Mahuri. This track is meditative, reflecting the towering green peaks of Rayagada and the sacred streams of Niyamgiri. In the quiet hours before village festival dances ignite, the Mahuri solo awakens the spirits of the ancestors.',
    lyrics: [
      {
        odia: 'ପାହାଡ଼ ଉପରେ ସଞ୍ଜ ନଇଁଲା, ମାହୁରୀ ସୁର ପବନେ ଭାସିଲା !',
        transliteration: 'Pahaada upare sanja naeela, Mahuri sura pabane bhaasila !',
        translation: 'Twilight descends upon the mountain ridges; the Mahuri notes float on the cool breeze!'
      },
      {
        odia: 'ପୂର୍ବପୁରୁଷେ ଦେଲେ ଆଶିଷ, ଜାଗି ଉଠିଲା ମାଟିର ହରଷ !',
        transliteration: 'Purba puruse dele aashisa, jaagi uthila maatira harasa !',
        translation: 'Our ancestors shower their blessings, awakening the deep joy of our land!'
      }
    ]
  },
  {
    id: 'song-5',
    slug: 'kandhamal-changu-jagar',
    title: 'Kandhamal Changu Jagar',
    desiaTitle: 'କନ୍ଧମାଳ ଚାଙ୍ଗୁ ଜାଗର',
    artist: 'Kandhamal Folk Heritage Troupe',
    artistId: 'artist-5',
    album: 'Aranya Dhwoni',
    category: 'Ritual / Jagar',
    district: 'Kandhamal',
    duration: 28,
    audioUrl: '/audio/kandhamal-changu-jagar.wav',
    artworkUrl: '/images/artwork/kandhamal-changu.svg',
    tempoBpm: 120,
    danceType: 'Nat Dhemsa (Circular trance stepping around sacred fire)',
    year: 2023,
    playCount: 8430,
    featured: false,
    instruments: ['Changu Drum', 'Brass Gong', 'Vocals'],
    culturalStory: 'Changu is an ancient single-headed tambourine drum made of jackfruit wood and heated goat hide. Played exclusively during ritual night vigils (Jagar), the hypnotic circular repetition connects the dancer to cosmic earth rhythms. This recording captures the raw acoustic power of ancient Kandhamal tribal ceremonies.',
    lyrics: [
      {
        odia: 'ନିଆଁ ଜଳୁଛି ରାତି ଯାକ, ଚାଙ୍ଗୁ ବାଜୁଛି ଧାକ ଧାକ !',
        transliteration: 'Niaan jaluchi raati jaaka, Changu baajuchi dhaaka dhaaka !',
        translation: 'The sacred bonfire burns all night; the Changu drum beats with hypnotic thunder!'
      },
      {
        odia: 'ଡାକି ଦିଅରେ ବଣ ଦେବତାଙ୍କୁ, ରକ୍ଷା କରନ୍ତୁ ଗାଁ ସାରାଙ୍କୁ !',
        transliteration: 'Daaki diare bana debataanku, rakhyaa karantu gaan saaraanku !',
        translation: 'Invoke the spirits of the sacred forest to protect our homes and kin!'
      }
    ]
  },
  {
    id: 'song-6',
    slug: 'dhemsa-tarang-fusion',
    title: 'Dhemsa Tarang (Acoustic Tribal Pulse)',
    desiaTitle: 'ଢେମ୍ସା ତରଙ୍ଗ (ଦେଶିଆ ବିଟ୍)',
    artist: 'Dhemsa Tarang Dal feat. Bidu',
    artistId: 'artist-6',
    album: 'Modern Desia Roots',
    category: 'New Releases',
    district: 'Koraput',
    duration: 28,
    audioUrl: '/audio/dhemsa-tarang-fusion.wav',
    artworkUrl: '/images/artwork/dhemsa-tarang.svg',
    tempoBpm: 128,
    danceType: 'Desia Fast Fusion (Modern youth chain-step)',
    year: 2025,
    playCount: 31250,
    featured: true,
    instruments: ['Tamak', 'Dhol', 'Acoustic Guitar', 'Mahuri', 'Shakers'],
    culturalStory: 'A landmark crossover between traditional Koraput percussionists and young acoustic musicians from Jeypore. Keeping the sacred tempo and polyrhythmic syncopations of authentic Dhemsa strictly intact, this track introduces warm acoustic chords, creating an infectious modern anthem for Desia identity.',
    lyrics: [
      {
        odia: 'ଢେମ୍ସା ନାଚୁଛି ନୂଆ ପିଢ଼ି, ପରମ୍ପରା ଯାଏ ଆଗକୁ ବଢ଼ି !',
        transliteration: 'Dhemsa naachuchi nuaa pidhi, parampara jaae aagaku badhi !',
        translation: 'The new generation joins the Dhemsa circle; our ancestral traditions surge forward with pride!'
      },
      {
        odia: 'ଦେଶିଆ ତାଳେ ଦୁନିଆଁ ଝୁମୁଛି, କୋରାପୁଟ ନାଁ ଗଗନେ ଗୁଞ୍ଜୁଛି !',
        transliteration: 'Desia taale dunia jhumuchi, Koraput naaan gagane gunjuchi !',
        translation: 'The world sways to the Desia rhythm; the name of Koraput reverberates through the heavens!'
      }
    ]
  }
];
