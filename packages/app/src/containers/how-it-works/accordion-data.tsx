import React from 'react';
import { IAccordionItem } from '@game-trade/ui/elements/accordion/interfaces';

export const accordionData: IAccordionItem[] = [
  {
    id: 1,
    title: 'What is an NFT?',
    content: (
      <div>
        <p>
          NFTs prove ownership of a unique digital asset like art, music, collectibles, videos or
          anything else with blockchain technology.
        </p>
        <p>
          NFT stands for non-fungible token. That sounds like an intimidating technical term (no
          more nerd talk, promise!). But NFTs are just digital certificates of authenticity.
        </p>
        <p>
          If you buy a physical painting, you know it’s real because you see the artist’s signature
          on the canvas. Somebody can photocopy the painting, but they don’t own it — you do. Before
          NFTs, digital assets were like photocopies:
        </p>
        <p>
          You can see who posted something, but you can’t see who owns an Instagram post, Pinterest
          Pin or Reddit meme.
        </p>
        <p>
          NFTs are like a signature for digital items: They authenticate ownership of digital assets
          like art, collectibles, music, videos, in-game assets, and more. Just like physical
          certificates, they document:
        </p>
        <ul>
          <li>Who created it</li>
          <li>When it was created</li>
          <li>Who bought it (and when)</li>
          <li>The price(s) it solds for</li>
          <li>Who owns it now</li>
        </ul>
        <p>
          (Technically, NFTs can contain any data the creator wants to include, but the above are
          most relevant.)
        </p>
        <p>
          All of this is public via a blockchain, so anyone can trace each of your NFTs from the
          original creator all the way to your wallet—and verify its authenticity (even the friends
          who call you crazy for buying a profile picture 😉).
        </p>
        <p>
          But owning digital assets is more than “nice to have”, a fun hobby or a digital stamp
          collection.
        </p>
      </div>
    ),
  },
  {
    id: 2,
    title: 'What are Proof of Work (PoW) and Proof of Stake (PoS) blockchains?',
    content: (
      <div>
        <p>
          We’re almost done with the technical terms, just bear with us for a moment here! These two
          «consensus mechanisms» are different ways blockchains validate transactions. There are big
          technical differences, but we promised to spare you the technical talk—so let’s talk about
          what matters to you.
        </p>
        <p>The main practical differences are:</p>
        <ul>
          <li>
            Proof of Work is extremely secure and decentralized, but consumes high amounts of energy
            and makes blockchains relatively slow because it relies on miners and their hardware to
            verify each block. In the case of Ethereum, it can also lead to high fees for buying,
            selling or minting NFTs.
          </li>
          <li>
            Proof of Stake blockchains usually have lower fees and higher performance since blocks
            are published by stakers—the PoS equivalent of miners—who lock up their funds in a smart
            contract. Because these blockchains are more efficient and no noisy expensive hardware
            is involved in the process, they also consume way less energy and have a smaller carbon
            footprint.
          </li>
        </ul>
        <p>
          As far as how you interact with digital assets, nothing changes between Proof of Work and
          Proof of Stake blockchains.
        </p>
      </div>
    ),
  },
  {
    id: 3,
    title: 'What is a wallet? Why do I need one?',
    content: (
      <div>
        <p>
          Your physical wallet probably contains your money, a form of ID, and maybe pictures of
          your loved ones (we’ll ignore that 3 year-old Starbuck’s membership card with $1.83 on
          it).
        </p>

        <p>
          Your crypto wallet does that on a blockchain. It has an “ID” (a long string of numbers and
          letters), your cryptocurrencies and any NFTs you bought with those cryptocurrencies. There
          are a number of wallet providers, including Metamask (the most popular and easy to use),
          Fortmatic, Coinbase and Rainbow, among others.
        </p>

        <p>
          When you create a crypto wallet, you get a “seed phrase” — a series of words which let you
          recover your currencies or NFTs if you lose access.
        </p>

        <p>
          <strong>NEVER GIVE THIS PHRASE TO ANYONE</strong>. Anyone who knows your seed phrase has
          full access to your wallet and can buy, sell or transfer any funds or assets.
        </p>

        <p>
          To transact with cryptocurrencies or NFTs on GameTrade or anywhere else, you need to
          connect your wallet to log in.
        </p>
      </div>
    ),
  },
  {
    id: 4,
    title: 'What makes GameTrade different from other NFT marketplaces?',
    content: (
      <div>
        <p>
          BTW GameTrade is NOT the only marketplace. Here’s a few reasons you might love GameTrade:
        </p>
        <ol>
          <li>
            Trade and rent. New possibilities for the in-game NFT economies. Users can trade or rent
            to each other
          </li>
          <li>
            Multi-chain: Some marketplaces only work on one blockchain. That means you miss out on
            NFTs you’d love which exist on other chains.
          </li>
          <li>
            Friends / networking. Messaging, news feed, referral programs. Great networking
            capabilities for finding friends and clients.
          </li>
          <li>
            Game-focused. GTM is an online marketplace like Amazon or eBay. The marketplace is fully
            focused on game industry, unlike OpenSea or Rarible. Game focus will allow for much
            closer community
          </li>
          <li>
            Community. User reputation, game reviews, item reviews, user-generated game guides,
            commenting functionality
          </li>
        </ol>
      </div>
    ),
  },
];
