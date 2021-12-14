import { v4 as uuidv4 } from 'uuid';

const sentences = [
  `I've always wondered about this coat business. When I'm in a theater, I either fold mine in my lap or throw it over my armrest, but Patsy always spreads hers out, acting as if the seat back were cold, and she couldn't possibly enjoy herself while it was suffering.`,
  `The chemistry of an element is determined by the manner in which its electrons are arranged in the atom. Such arrangements are the basis of the modern periodic classification of the elements: the Periodic Table.`,
  `I can take you for a ride on my big green tractor, we can go slow or make it go faster, down through the woods and out to the pasture, long as I'm with you it really don't matter.`,
  `What would you think if I sang out of tune? Would you stand up and walk out on me? Lend me your ears and I'll sing you a song and I'll try not to sing out of key. Oh I get by with a little help from my friends.`,
  `You better lose yourself in the music, the moment. You own it, you better never let it go. You only get one shot, do not miss your chance to blow. This opportunity comes once in a lifetime.`,
  `You know, you go to thrift shops and you go to garage sales because you think you're going to find something that's, you know, real rare. And most of the time, it's a total waste of time, but once in a while, you'll, you'll come up with something that'll whet your appetite.`,
  `She said that she had just joined up as a new recruit. She said they threw her in prison because she refused to take part in the rebellion. I gave her the key. Looks like she managed to break out of here though. I hope she's okay.`,
  `How many roads must a man walk down before you call him a man? Yes, and how many seas must a white dove sail before she sleeps in the sand? Yes, and how many times must the cannon balls fly before they're forever banned? The answer, my friend, is blowin' in the wind; the answer is blowin' in the wind.`,
  `All the times that I've cried, keeping all the things I knew inside. And it's hard, but it's harder to ignore it. If they were right I'd agree, but it's them they know, not me. Now there's a way and I know that I have to go away.`,
  `That's right, and the one who wins gets a prize, only there really isn't a prize. It's just the honor of winning, because all the money goes to charity, that is, if there is any money left over, but there never is.`,
  `Still, we will let all this be a thing of the past, though it hurts us, and beat down by constraint the anger that rises inside us. Now I am making an end of my anger. It does not become me, unrelentingly to rage on.`,
  `There was a little boy once upon a time who in spite of his young age and small size knew his mind. For every copper penny and clover he would find, he'd make a wish for better days and the end of hard times.`,
  `Each time a man stands up for an ideal, or acts to improve the lot of others, or strikes out against injustice, he sends forth a tiny ripple of hope.`,
  `Unlike the other four senses located in the logical regions of the forebrain, our sense of smell is wired directly into the limbic system, the so-called "reptilian" cellar of the brain responsible for our most basic emotions, from rage to lust.`,
  `We climbed, he first and I behind, until through a small round opening ahead of us, I saw the lovely things the heavens hold, and we came out to see once more the stars.`,
  `The law clearly states that magic may be used before muggles in life threatening situations.`,
  `Have you ever felt so strong that it made you feel weak? Long days, long nights, and you just can't sleep. Have you ever been so sure, that it gave you cold feet? Got you floating on air, you can feel your heart beat. Well I never knew this feeling, ever. Now I hope it stays and lasts forever.`,
  `She knew since she was little, the world would not sing her triumphs, but she took all of the stereotypes and put them in a chokehold until they breathed out the truth.`,
  `It's a wonder to be alive. If you don't understand that, how can you search for anything deeper?`,
  `Your bed is with you in the void. But not for long - it goes away from you. You don't have any way to get it back, so you just let it go. But so now we have a body in the void with you. So does the bed move, or do you move? Or both?`,
  `Nothing in life is easy. But that's no reason to give up. You'll be surprised what you can accomplish if you set your mind to it.`,
  `The lady said the Langston who wrote these words is a poet. Seems more like a magician to me, pulling words from my heart I never knew I had.`,
  `Now did you answer 'cause you thought that's what I wanted to hear, or did you think about what I said and answer 'cause you truly believe that to be right?`,
  `Well, isn't this great, we've all learned something. Tony can't choose who his sister's gonna fall for, Monica can't choose who she's gonna fall for, and I think that I've learned the greatest lesson of all. I love being lifted.`,
  `Many rivers to cross but I can't seem to find my way over. Wandering, I am lost as I travel along the white cliffs of Dover. Many rivers to cross and it's only my will that keeps me alive.`,
  `Recalling the past dredges up regrets that make me want to die, and when I think of the future, the anxiety just makes me depressed. By process of elimination, you could say right now is my happiest time.`,
  `Reach out your hand if your cup be empty. If your cup is full, may it be again. Let it be known there is a fountain that was not made by the hands of men.`,
  `Thing is Butch, right now you got ability. But painful as it may be, ability don't last. Now that's a hard fact of life, but it's a fact of life you're gonna have to get realistic about.`,
];


export const generateNewSentence = () => {
  const words = sentences[Math.floor(Math.random() * sentences.length)].split(' ');
  const wordsWithSpaces = words.map((word, i) => {
    if (i !== words.length - 1) {
      word = word + ' ';
    }
    return word;
  })
  return wordsWithSpaces;
  // put into an array of words each (space included)
}

export const generateUniqueId = () => {
  return uuidv4();
}