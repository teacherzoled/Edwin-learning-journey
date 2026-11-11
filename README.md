# Edwin's Learning Journey

A home for Edwin Jr.'s learning apps, built for a phone. The homepage is a road, and each app is a stop on that road.

Live site: https://teacherzoled.github.io/edwin-learning-journey/

## What is here

| Folder | App | What it teaches |
| --- | --- | --- |
| `/` (`index.html`) | The hub | The road map with every stop |
| `numbers/` | Nano's Number Garage | Recognising numbers 1 to 10 without counting up |
| `bible-road/` | Nano's Bible Road | Review of his Bible notes: God's Word (Psalm 119:105), the Old and New Testament, and the Trinity |
| `belize-symbols/` | Fly Over Belize | Review of his notes on Independence Day and the national symbols: flag, tapir, toucan, mahogany, black orchid |
| `health/` | Ambulance Health Run | Review of his Health Education notes in three short roads he picks from: Safe water (12 stops), Germs (7) and Clean hands (11: where germs live, soap and water, the ABC scrub song, hand sanitizer, clean towel, nail clipper) |
| `letters/` | Letter Road | Letter sounds in the school's order (s, a, t, p, i, r, n, m): Garage (learn), Trace Track (trace the small letter, then the capital), Sound Horn (hear the sound, tap the letter), First Sound Pickup (picture, tap its first letter), Twin Cars (capital to small letter), Say It (parent-scored), plus a starting check |
| `blend/` | Blend Road | Blending: Drive the Road (learn), Which Road? (hear a word, tap it), Picture Stop (read a word, tap its picture), Build-Up Tower (the school's word pyramid: r, ri, rip, then tap the picture), Read It To Me (parent-scored) |
| `words/` | Word Parking | Sight words learned whole (I, a, see, one, two, he, she, the, has, my, boy, girl): Park It (hear a word, park on it), Spot the Word (read the sign, find the car that says it), Read and Pick (read "the boy", tap the picture), Read It To Me (parent-scored) |

Stops marked "Coming soon" on the homepage: Sentence Trip (sentences around Belize) and Book Racetrack (first books).

## Adding a new app

1. Put the app in its own folder with an `index.html`, for example `letters/index.html`.
2. In the root `index.html`, find the `STOPS` list and change that stop to `open:true` with its `href`, for example `href:"letters/"`.
3. Commit and push. GitHub Pages updates in about a minute.

## Notes

- The review quizzes save each question's last 5 tries on the phone (`nanoQuiz.bible.v1`, `nanoQuiz.belize.v1`, `nanoQuiz.health.v1`). A question is strong when he gets it right on the first try in 4 of his last 5 drives, the same rule as the Number Garage. The hub shows strong questions and drives today; each quiz's end screen has a parent check with every question's recent tries.
- **Ambulance Health Run roads:** each road is its own drive, so a session stays short. Questions live in `WATER`, `GERMS` and `HANDS`, and `ROUTES` sets each road's name, end-screen pictures and spoken recap. The Clean hands road has one stop with no right or wrong answer: he taps the hands once per letter while the ABC song is spoken, and the germs disappear by Z. It is not counted toward strong. The hub's total (29) counts the scored questions across all three roads.
- The three review quizzes read every question and picture aloud, so he does not need to read. They use the English and Spanish voices chosen in the Number Garage's Parents screen when set.

- **Child's name:** the Parents box at the bottom of the hub sets the name in the welcome, the title and the spoken greeting. It is saved on that phone only (`nanoHub.v1`), so each family's phone can show its own child's name. The default is Edwin; an empty box shows "My Learning Journey". The apps inside each stop do not use the name.
- Each app saves progress in the phone's browser storage. All apps share the website `teacherzoled.github.io`, so the hub can show progress from each app.
- Spanish is used only as a spoken meaning bridge. English always comes first, and Spanish never appears written on the child's screens.

## Letter Road, Blend Road and Word Parking

- **Storage keys:** `nanoLetters.v1` (Letter Road: letters switched on, progress, laps, starting checks) `nanoBlend.v1` (Blend Road: word progress, Read It To Me results, laps) and `nanoWords.v1` (Word Parking: sight words switched on, progress, Read It To Me results, laps). Sound on/off, the Spanish bridge switch and the chosen voices are shared with every stop through the `settings` in `nanoNumbers.v1`.
- **Strong:** a letter is strong when he finds it (Sound Horn and Pickup) right on the first try in 4 of his last 5 rounds. Say It and Twin Cars have their own lights and do not count toward strong. Trace Track counts toward laps (5 traces = a lap) but never toward strong, and is never marked wrong. A word is strong on the same rule over Which Road?, Picture Stop and the picture pick in Build-Up Tower; Read It To Me is kept separately (read it / sounded it out / not yet). A sight word is strong on the same rule over Park It, Spot the Word and Read and Pick (a phrase counts for each sight word in it).
- **Letters switched on:** Letter Road · Parents has a switch for each letter (s, a, t, p, i, r, n, m are on at first; at least 2 stay on). Phones that already had Letter Road got r, n and m switched on once on 10 November (the `SWITCH_ON_ONCE` list, id `nov10-rnm`, remembered in `mig` inside `nanoLetters.v1`); after that a parent's own on/off choice is kept. Blend Road and the hub apply the same list, so keep the lists in `letters/index.html`, `blend/index.html` and `index.html` in step. Blend Road reads the same `nanoLetters.v1` key and only uses words whose letters are all on; Parents shows which letters a locked word is waiting for.
- **Recorded sounds:** the phone voice cannot say a letter sound on its own, so Letter Road · Parents lets a parent record each sound (2 seconds, stops by itself). Recordings are saved on the phone in IndexedDB (database `nanoSounds`, store `sounds`, one entry per letter) and both apps use them. Until a sound is recorded the games use the keyword instead ("Which letter starts sun?"), and Blend Road plays a soft engine blip for that tile. Recording needs the website address (https), not a saved file.
- **Font:** the letters a-z and A-Z of Andika (SIL Open Font License) are embedded in all three apps so the single-storey "a" shows even offline.
- **Trace Track paths:** the `TRACE` table in `letters/index.html` holds each glyph's strokes in the school's order (for R: down, bump, leg; for r: down, then the little arch), as SVG paths in a 100 x 124 box (capital top y=10, small-letter top y=45, baseline y=95, tail y=118). A stroke with no length is a dot to tap.

### Adding the next letter and its words

1. In `letters/index.html`, add one entry to `LETTERS`, for example `{l:'h',up:'H',on:false,look:['n'],kw:[{w:'hat',es:'sombrero'},{w:'hen',es:'gallina'},{w:'house',es:'casa'}]}`.
2. In the same file, draw its three pictures in `PIC` (one function per keyword, drawn in a 100 x 100 box; the name is the keyword, or set `pic:` in the keyword), and add its small and capital strokes to `TRACE`.
3. To switch it on for phones that already have the app, add an entry to `SWITCH_ON_ONCE` with a new id (in Letter Road, Blend Road and the hub). Otherwise leave `on:false` and switch it on in Parents.
4. In `blend/index.html`, add the new words to `WORDS`, for example `{w:'hat',pic:'hat',es:'sombrero'}`, and draw any picture in that file's `PIC`. Words without `pic` still work in Which Road?, Drive the Road and Read It To Me (not Picture Stop or Build-Up Tower).
5. Commit and push. The built-in sound for the letter is already in `sounds/`.

### Adding a sight word

1. In `words/index.html`, add one entry to `WORDS`, for example `{w:'is',school:'is',week:'17 Nov'}` (`w` is shown lowercase in the games except I; `school` is how the class list writes it; `es` is an optional spoken bridge).
2. To use it in Read and Pick, add a phrase to `PHRASES` with a picture in that file's `PIC`, for example `{t:'the boy has',pic:'...',set:'kid'}`.
3. Commit and push. New words start switched on; a parent can switch any word off in Word Parking · Parents.


## Built-in letter sounds

`sounds/<letter>.mp3` holds one clip for every letter a–z (s, a, t, p, i, r, n, m in use so far). Letter sounds recorded by Kathryn J. Davis, used with permission. She gave written permission by email on 10 November 2026 for use in these activities on a public web page; they are from her Sound City Reading materials and are not to be sold. Both Letter Road and Blend Road load these when the phone has no recording of its own for that letter. Each app fetches only the sounds of letters that are switched on. All 26 sounds are already here, so adding a new letter needs only its entry in `LETTERS` (Letter Road) and its words in `WORDS` (Blend Road). The short-vowel files used are alphasounds-o-sh and alphasounds-u-sh.
