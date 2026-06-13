import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthFetch } from "../utils/authFetch";
import Layout from "../components/Layout";
import { useLayoutContext } from "../components/LayoutContext";
import StripeEmbeddedCheckout from "../components/StripeEmbeddedCheckout";
import { Heart, Star, Sparkles, UserPlus, SlidersHorizontal, Image as ImageIcon, MessageSquareHeart, Check, ArrowRight, ArrowLeft, X, Flame, Gem, Infinity as InfinityIcon, Shield, Sparkle, User, MessageCircle, Lock, Crown, Dices, Play } from "lucide-react";
import LoginModal from "../components/LoginModal";

// Asset Imports
import africanEthnicity from '../assets/create/ethnicity/african.png';
import asianEthnicity from '../assets/create/ethnicity/asian.png';
import europeanEthnicity from '../assets/create/ethnicity/european.png';
import latinaEthnicity from '../assets/create/ethnicity/latina.png';
import arabicEthnicity from '../assets/create/ethnicity/arabic.png';

import smallBreast from '../assets/breast/small.png'
import mediumBreast from '../assets/breast/medium.png'
import bigBreast from '../assets/breast/big.png'
import largeBreast from '../assets/breast/large.png'

import brownHair from '../assets/create/hair/brown.png';
import blondeHair from '../assets/create/hair/blonde.png';
import redHair from '../assets/create/hair/redhair.png';
import blackHair from '../assets/create/hair/black.png';
import pinkHair from '../assets/create/hair/pink.png';
import silverHair from '../assets/create/hair/silver.png';

import blueEyes from '../assets/create/eyes/blue.png';
import greenEyes from '../assets/create/eyes/green.png';
import brownEyes from '../assets/create/eyes/brown.png';

import athleticBody from '../assets/create/body/athletic.png';
import curvyBody from '../assets/create/body/curvy.png';
import petiteBody from '../assets/create/body/petite.png';
import slimBody from '../assets/create/body/slim.png';
import thickBody from '../assets/create/body/thick.png';

import realisticGirlImg from '../assets/task_01kmwzbe1tfvp912tg8rwe5hay_1774793926_img_1.webp';
import animeGirlImg from '../assets/anime_girl_preview.png';

// Survey Data Lists (English Translation)
const ETHNICITIES = [
  { value: "asian", label: "Asian", image: asianEthnicity },
  { value: "latina", label: "Latina", image: latinaEthnicity },
  { value: "european", label: "European", image: europeanEthnicity },
  { value: "african", label: "African", image: africanEthnicity },
  { value: "arabic", label: "Middle Eastern", image: arabicEthnicity },
];

const HAIRSTYLES = [
  { value: "short", label: "Short", gradient: "from-rose-500/20 to-pink-500/20" },
  { value: "bob", label: "Bob", gradient: "from-purple-500/20 to-indigo-500/20" },
  { value: "medium", label: "Medium", gradient: "from-blue-500/20 to-cyan-500/20" },
  { value: "long", label: "Long", gradient: "from-emerald-500/20 to-teal-500/20" },
  { value: "wavy", label: "Wavy", gradient: "from-amber-500/20 to-orange-500/20" },
  { value: "curly", label: "Curly", gradient: "from-fuchsia-500/20 to-violet-500/20" }
];

const HAIR_COLORS = [
  { value: "blonde", label: "Blonde", image: blondeHair },
  { value: "brunette", label: "Brown", image: brownHair },
  { value: "black", label: "Black", image: blackHair },
  { value: "redhead", label: "Redhead", image: redHair },
  { value: "pink", label: "Pink", image: pinkHair },
  { value: "silver", label: "Silver", image: silverHair },
];

const EYE_COLORS = [
  { value: "blue", label: "Blue", image: blueEyes },
  { value: "green", label: "Green", image: greenEyes },
  { value: "brown", label: "Brown", image: brownEyes },
];

const BODY_TYPES = [
  { value: "slim", label: "Slim", image: slimBody },
  { value: "curvy", label: "Curvy", image: curvyBody },
  { value: "athletic", label: "Athletic", image: athleticBody },
  { value: "petite", label: "Petite", image: petiteBody },
  { value: "thick", label: "Thick", image: thickBody },
];

const BREAST_SIZES = [
  { value: "small", label: "Small", sizeText: "A-B", image: smallBreast },
  { value: "medium", label: "Medium", sizeText: "C-D", image: mediumBreast },
  { value: "large", label: "Large", sizeText: "DD-E", image: bigBreast },
  { value: "extra_large", label: "Very Large", sizeText: "F+", image: largeBreast }
];

const PERSONALITY_TRAITS = [
  { value: "nimfomanka", label: "Nymphomaniac" },
  { value: "kochanka", label: "Lover" },
  { value: "ulegla", label: "Submissive" },
  { value: "dominujaca", label: "Dominant" },
  { value: "kusicielka", label: "Temptress" },
  { value: "niewinna", label: "Innocent" },
  { value: "opiekunka", label: "Caregiver" },
  { value: "eksperymentatorka", label: "Experimental" },
  { value: "wredna", label: "Bratty" },
  { value: "powierniczka", label: "Confidante" },
  { value: "niesmiala", label: "Shy" },
  { value: "krolowa", label: "Queen" }
];

const PROFESSIONS = [
  "Engineer", "Dancer", "Model", "Student",
  "Stripper", "Maid", "Camgirl",
  "Boss / CEO", "Babysitter", "Pornstar",
  "Streamer", "Bartender", "Lifeguard", "Cashier",
  "Masseuse", "Teacher", "Nurse", "Secretary",
  "Yoga Instructor", "Fitness Trainer", "Cook", "Artist",
  "Movie Star / Actress", "Doctor", "Librarian",
  "Spy", "Police Officer", "Soldier", "Lawyer",
  "Hairdresser", "Dentist", "Singer / Musician",
  "Gynecologist", "Writer", "Flight Attendant",
  "Pro Athlete", "Scientist", "Florist",
  "Makeup Artist", "Photographer", "Social Worker"
];

const FETISHES = [
  "Bondage", "Spanking", "Collar & Leash", "Punishment", "Humiliation",
  "Public play", "Roleplay", "Anal play",
  "Oral play", "Cum play", "Creampie", "Squirting",
  "Dirty talk", "Breeding", "Daddy dom", "Edging",
  "Obedience", "Control", "Inexperienced", "Shy teasing",
  "Playful teasing", "Cuddling", "Slow and sensual", "Hair pulling"
];

const VOICES = [
  { value: "voice_1", label: "Voice 1 Confident" },
  { value: "voice_2", label: "Voice 2 Cheerful" },
  { value: "voice_3", label: "Voice 3 Dominant" },
  { value: "voice_4", label: "Voice 4 Innocent" },
  { value: "voice_5", label: "Voice 5 Sweet" },
  { value: "voice_6", label: "Voice 6 Sensual" },
  { value: "voice_7", label: "Voice 7 Calm" },
  { value: "voice_8", label: "Voice 8 Thoughtful" },
  { value: "voice_9", label: "Voice 9 Moody" }
];

const RELATIONSHIPS = [
  { value: "girlfriend", label: "Girlfriend" },
  { value: "friend", label: "Friend" },
  { value: "wife", label: "Wife" },
  { value: "mistress", label: "Mistress" },
  { value: "stranger", label: "Stranger" },
  { value: "workcolleague", label: "Work colleague" }
];

// Random Name Suggestions
const RANDOM_GIRL_NAMES = ["Emma", "Olivia", "Sophia", "Isabella", "Mia", "Charlotte", "Amelia", "Harper", "Evelyn", "Abigail", "Emily", "Elizabeth", "Avery", "Ella", "Madison", "Scarlett", "Victoria", "Chloe", "Camila", "Penelope", "Zoey", "Layla", "Riley"];
const RANDOM_TRANS_NAMES = ["Ashley", "Nicole", "Maya", "Clara", "Zara", "Daisy", "Alice", "Lily", "Sophie", "Chloe", "Stella", "Luna", "Ruby", "Violet", "Elena"];

export default function CreateGirlPage() {
  const navigate = useNavigate();
  const authFetch = useAuthFetch();
  const { premium, isLoggedIn } = useLayoutContext();

  // Wizard state: 1 to 11 = Survey steps. 12 = Loading preparation. 13 = Summary page
  const [step, setStep] = useState(1);

  // Selection States
  const [gender, setGender] = useState("girl"); // girl | trans
  const [artStyle, setArtStyle] = useState(null); // realistic | anime
  const [ethnicity, setEthnicity] = useState(null);
  const [age, setAge] = useState(21);
  const [hairstyle, setHairstyle] = useState(null);
  const [hairColor, setHairColor] = useState(null);
  const [eyeColor, setEyeColor] = useState(null);
  const [bodyType, setBodyType] = useState(null);
  const [breastSize, setBreastSize] = useState(null);
  const [name, setName] = useState("");
  const [selectedTraits, setSelectedTraits] = useState([]);
  const [relationship, setRelationship] = useState(null);
  const [profession, setProfession] = useState(null);
  const [voice, setVoice] = useState(null);
  const [selectedFetishes, setSelectedFetishes] = useState([]);

  // Loading generation state
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing connection...");
  const [previewImage, setPreviewImage] = useState(null);
  const [savedGirlfriendId, setSavedGirlfriendId] = useState(null);
  const [validationError, setValidationError] = useState("");

  // Overlay / Payment Dialog States
  const [showPremiumOverlay, setShowPremiumOverlay] = useState(false);
  const [premiumView, setPremiumView] = useState("benefits"); // benefits | plans | checkout
  const [checkoutPlanId, setCheckoutPlanId] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Auto-resume creation if logged in and pending creation exists
  useEffect(() => {
    if (isLoggedIn) {
      const pendingStr = localStorage.getItem("pendingGirlfriendCreation");
      if (pendingStr) {
        try {
          const pendingData = JSON.parse(pendingStr);
          // Try to execute the save and navigate
          (async () => {
            setStep(6);
            setProgress(50);
            setLoadingText("Saving your character to database...");

            const apiUrl = import.meta.env.VITE_API_URL || '/api/v1';
            const res = await authFetch(`${apiUrl}/girlfriends`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(pendingData)
            });
            const data = await res.json();

            if (data.type === "success" && data.savedGirlfriend) {
              localStorage.removeItem("savedGeneratedGirlfriend");
              localStorage.removeItem("pendingGirlfriendCreation");
              setProgress(100);
              setTimeout(() => {
                navigate(`/chat/${data.savedGirlfriend._id}`);
              }, 500);
            } else {
              throw new Error(data.message || "Failed to save character");
            }
          })().catch(e => {
            console.error(e);
            setStep(7);
            alert("An error occurred while saving the character. Please try again.");
            localStorage.removeItem("pendingGirlfriendCreation"); // Clear to prevent infinite loop
          });
        } catch (e) {
          console.error("Failed to parse pending girlfriend", e);
          localStorage.removeItem("pendingGirlfriendCreation");
        }
      }
    }
  }, [isLoggedIn]);

  // Load saved generated girlfriend from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("savedGeneratedGirlfriend");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.name) setName(data.name);
        if (data.age) setAge(data.age);
        if (data.hairColor) setHairColor(data.hairColor);
        if (data.hairstyle) setHairstyle(data.hairstyle);
        if (data.eyeColor) setEyeColor(data.eyeColor);
        if (data.bodyType) setBodyType(data.bodyType);
        if (data.breastSize) setBreastSize(data.breastSize);
        if (data.ethnicity) setEthnicity(data.ethnicity);
        if (data.gender) setGender(data.gender);
        if (data.artStyle) setArtStyle(data.artStyle);
        if (data.selectedTraits) setSelectedTraits(data.selectedTraits);
        if (data.relationship) setRelationship(data.relationship);
        if (data.profession) setProfession(data.profession);
        if (data.voice) setVoice(data.voice);
        if (data.selectedFetishes) setSelectedFetishes(data.selectedFetishes);
        if (data.previewImage) setPreviewImage(data.previewImage);
        setStep(7); // Go directly to Step 7 (Summary screen)
      } catch (e) {
        console.error("Failed to parse saved generated girlfriend:", e);
      }
    }
  }, []);

  // Set default random name based on selected gender
  useEffect(() => {
    const hasSaved = localStorage.getItem("savedGeneratedGirlfriend");
    if (!hasSaved && !name) {
      const list = gender === "trans" ? RANDOM_TRANS_NAMES : RANDOM_GIRL_NAMES;
      const randomName = list[Math.floor(Math.random() * list.length)];
      setName(randomName);
    }
  }, [gender, name]);

  // Reset the wizard and clear saved generated girlfriend
  const handleReset = () => {
    localStorage.removeItem("savedGeneratedGirlfriend");
    localStorage.removeItem("pendingGirlfriendCreation");
    setName("");
    setAge(18);
    setHairColor(null);
    setHairstyle(null);
    setEyeColor(null);
    setBodyType(null);
    setBreastSize(null);
    setEthnicity(null);
    setGender("girl");
    setArtStyle(null);
    setSelectedTraits([]);
    setRelationship(null);
    setProfession(null);
    setVoice(null);
    setSelectedFetishes([]);
    setPreviewImage(null);
    setStep(1);
  };

  // Helper to check if the current step selections are fully complete
  const isStepValid = (stepNum) => {
    if (stepNum === 1) return !!artStyle;
    if (stepNum === 2) return !!ethnicity;
    if (stepNum === 3) return !!hairstyle && !!hairColor && !!eyeColor;
    if (stepNum === 4) return !!bodyType && !!breastSize;
    if (stepNum === 5) return !!name.trim() && selectedTraits.length > 0 && !!relationship && !!profession && !!voice && selectedFetishes.length > 0;
    return true;
  };

  // Clear validation errors when options change
  useEffect(() => {
    setValidationError("");
  }, [artStyle, ethnicity, hairstyle, hairColor, eyeColor, bodyType, breastSize, name, selectedTraits, relationship, profession, voice, selectedFetishes, step]);

  // Handle survey step progression
  const nextStep = () => {
    setValidationError("");

    if (step === 1 && !artStyle) {
      setValidationError("Please select an art style to continue.");
      return;
    }
    if (step === 2 && !ethnicity) {
      setValidationError("Please select an ethnicity to continue.");
      return;
    }
    if (step === 3) {
      const missing = [];
      if (!hairstyle) missing.push("Hairstyle");
      if (!hairColor) missing.push("Hair color");
      if (!eyeColor) missing.push("Eye color");
      if (missing.length > 0) {
        setValidationError(`Please select: ${missing.join(", ")}.`);
        return;
      }
    }
    if (step === 4) {
      const missing = [];
      if (!bodyType) missing.push("Body type");
      if (!breastSize) missing.push("Breast size");
      if (missing.length > 0) {
        setValidationError(`Please select: ${missing.join(", ")}.`);
        return;
      }
    }
    if (step === 5) {
      const missing = [];
      if (!name.trim()) missing.push("Name");
      if (!relationship) missing.push("Relationship type");
      if (!profession) missing.push("Profession");
      if (!voice) missing.push("Voice");
      if (selectedTraits.length === 0) missing.push("at least one Personality Trait");
      if (selectedFetishes.length === 0) missing.push("at least one Fetish");
      if (missing.length > 0) {
        setValidationError(`Please select or fill in: ${missing.join(", ")}.`);
        return;
      }
    }

    if (step === 5) {
      startGeneration();
    } else {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  // Toggle trait select
  const handleTraitToggle = (val) => {
    setSelectedTraits(prev =>
      prev.includes(val) ? prev.filter(t => t !== val) : [...prev, val]
    );
  };

  // Start AI generation process (step 6)
  const startGeneration = async () => {
    setStep(6);
    setProgress(0);
    setLoadingText("Creating your AI companion...");
    setPreviewImage(null); // Reset preview image to avoid showing old images

    const saveToLocalStorage = (imgUrl) => {
      localStorage.setItem("savedGeneratedGirlfriend", JSON.stringify({
        name,
        age,
        hairColor,
        hairstyle,
        eyeColor,
        bodyType,
        breastSize,
        ethnicity,
        gender,
        artStyle,
        selectedTraits,
        relationship,
        profession,
        voice,
        selectedFetishes,
        previewImage: imgUrl
      }));
    };

    // 1. Kick off preview generation in background
    let generatedImage = null;
    let apiCompleted = false;
    const bioText = `I am ${name}, I am ${age} years old, I am interested in many things and looking for someone to talk to.`;
    const initialMsg = `Hi! I am really happy we can talk. How are you doing today?`;

    const previewPayload = {
      name,
      age,
      hairColor,
      hairstyle,
      eyeColor,
      bodyType,
      breastSize,
      ethnicity,
      bio: bioText,
      relationship,
      tags: selectedTraits,
      gender,
      style: artStyle,
      profession,
      fetishes: selectedFetishes,
      personality: selectedTraits
    };

    const apiUrl = import.meta.env.VITE_API_URL || '/api/v1';

    // Fire background preview image request
    fetch(`${apiUrl}/girlfriends/preview`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(previewPayload)
    })
      .then(res => res.json())
      .then(data => {
        if (data.type === "success" && data.previewImage) {
          const fullUrl = data.previewImage.startsWith("/uploads/")
            ? `${import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:3000'}${data.previewImage}`
            : data.previewImage;

          // Preload the image in browser cache
          const img = new Image();
          img.src = fullUrl;
          img.onload = () => {
            generatedImage = data.previewImage;
            setPreviewImage(data.previewImage);
            apiCompleted = true;
            saveToLocalStorage(data.previewImage);
          };
          img.onerror = () => {
            console.error("Failed to preload generated image, falling back");
            generatedImage = data.previewImage;
            setPreviewImage(data.previewImage);
            apiCompleted = true;
            saveToLocalStorage(data.previewImage);
          };
        } else {
          apiCompleted = true;
        }
      })
      .catch(err => {
        apiCompleted = true;
        console.error("Failed to generate preview image in bg:", err);
      });

    // 2. Perform loading progress ticks (takes ~6-8 seconds)
    const progressSteps = [
      { val: 20, text: "Shaping facial features..." },
      { val: 45, text: "Styling hair and matching aesthetics..." },
      { val: 70, text: "Designing wardrobe..." },
      { val: 90, text: "Learning personality patterns..." }
    ];

    let currentProgress = 0;
    let stepIdx = 0;

    const interval = setInterval(() => {
      currentProgress += 1;

      if (stepIdx < progressSteps.length && currentProgress >= progressSteps[stepIdx].val) {
        setLoadingText(progressSteps[stepIdx].text);
        stepIdx++;
      }

      if (currentProgress >= 98) {
        if (!apiCompleted) {
          setProgress(98);
          setLoadingText("Finishing character portrait...");
          return;
        }

        clearInterval(interval);
        setProgress(100);
        setLoadingText("Ready!");

        // Save default fallback image if background preview did not complete
        if (!generatedImage) {
          const fallbackImg = artStyle === "anime" ? animeGirlImg : realisticGirlImg;
          setPreviewImage(fallbackImg);
          saveToLocalStorage(fallbackImg);
        }

        // Transition to summary page (step 7)
        setTimeout(() => {
          setStep(7);
        }, 500);
        return;
      }

      setProgress(currentProgress);
    }, 65);
  };

  // Final Action: Revive / Start chatting
  const handleOżyw = async () => {
    const chosenPayload = {
      name,
      age,
      hairColor,
      hairstyle,
      eyeColor,
      bodyType,
      breastSize,
      ethnicity,
      gender,
      style: artStyle,
      relationship,
      tags: selectedTraits,
      profession,
      voice,
      fetishes: selectedFetishes,
      personality: selectedTraits,
      bio: `I am ${name}, I am ${age} years old, I am interested in many things and looking for someone to talk to.`,
      initialMessage: `Hi! I am really happy we can talk. How are you doing today?`,
      actions: ["kiss", "hug", "flirt", "dance"]
    };

    localStorage.setItem('pendingGirlfriendCreation', JSON.stringify(chosenPayload));

    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    // User is logged in! Proceed to save girlfriend in DB and redirect
    try {
      setStep(6);
      setProgress(50);
      setLoadingText("Saving your character to database...");

      const apiUrl = import.meta.env.VITE_API_URL || '/api/v1';
      const res = await authFetch(`${apiUrl}/girlfriends`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(chosenPayload)
      });
      const data = await res.json();

      if (data.type === "success" && data.savedGirlfriend) {
        localStorage.removeItem("savedGeneratedGirlfriend");
        localStorage.removeItem("pendingGirlfriendCreation");
        setProgress(100);
        setTimeout(() => {
          navigate(`/chat/${data.savedGirlfriend._id}`);
        }, 500);
      } else {
        throw new Error(data.message || "Failed to save character");
      }
    } catch (e) {
      console.error(e);
      setStep(7);
      alert("An error occurred while saving the character. Please try again.");
    }
  };

  // Plan subscriptions details (English Translation)
  const plans = [
    { title: "12 months", price: "3.99", discount: "70% OFF", id: 'price_1TKc7ZC3BOlFgA9PiqYYgmMd', badge: "BEST CHOICE", billText: "$47.88" },
    { title: "3 months", price: "8.99", discount: "35% OFF", id: 'price_1TKc6XC3BOlFgA9Puv0bQMYe', billText: "$26.97" },
    { title: "1 month", price: "13.99", discount: null, id: 'price_1TKaJyC3BOlFgA9PtqmM5YNl', billText: "$13.99" },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-[#0a0a0f] flex flex-col justify-center items-center py-4 md:py-8 px-4 md:px-6 overflow-hidden relative select-none">

        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#e11d48]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-[#e11d48]/5 rounded-full blur-[120px] pointer-events-none" />

        {/* --- MAIN CREATION PANEL --- */}
        {step <= 5 && (
          <div className="max-w-4xl w-full text-center z-10 flex flex-col items-center pb-24 md:pb-0">

            {/* Top progress tracker */}
            <div className="w-full max-w-xl mb-6 md:mb-12">
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden w-full relative">
                <div
                  className="h-full bg-[#e11d48] rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(225,29,72,0.6)]"
                  style={{ width: `${(step / 5) * 100}%` }}
                />
              </div>
              <div className="flex justify-between mt-3 text-[10px] text-white/20 tracking-wider font-semibold uppercase">
                <span>Step {step} of 5</span>
                <span>{Math.round((step / 5) * 100)}%</span>
              </div>
            </div>

            {/* Render Steps */}
            <div className="w-full min-h-[380px] flex items-center justify-center">

              {/* Step 1: Category & Art Style */}
              {step === 1 && (
                <div className="space-y-8 w-full animate-in fade-in duration-300">
                  <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                    Create my AI Girlfriend
                  </h2>

                  {/* Category Pill Buttons */}
                  <div className="flex justify-center items-center gap-4">
                    {CATEGORIES_BUTTONS.map((cat) => {
                      const isActive = gender === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setGender(cat.id)}
                          className={`
                            flex items-center gap-2 px-6 py-3 rounded-full border font-bold text-sm tracking-wide transition-all duration-300
                            ${isActive
                              ? 'border-[#e11d48] bg-[#e11d48]/10 text-white shadow-[0_0_15px_rgba(225,29,72,0.15)]'
                              : 'border-white/10 bg-white/5 text-white/40 hover:text-white hover:border-white/20'
                            }
                          `}
                        >
                          {cat.id === "girl" ? (
                            <span className="text-pink-500 text-lg">♀</span>
                          ) : (
                            <span className="text-purple-400 text-lg">⚧</span>
                          )}
                          {cat.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Art Styles Grid */}
                  <div className="grid grid-cols-2 gap-4 md:gap-6 w-full max-w-lg md:max-w-2xl mx-auto">
                    {STYLES.map((style) => {
                      const isSelected = artStyle === style.id;
                      return (
                        <button
                          key={style.id}
                          onClick={() => setArtStyle(style.id)}
                          className={`
                            group relative overflow-hidden rounded-[1.5rem] aspect-[4/5] md:aspect-[3/4] transition-all duration-500 border-2
                            ${isSelected
                              ? 'border-[#e11d48] shadow-[0_0_25px_rgba(225,29,72,0.2)] scale-[1.02]'
                              : 'border-transparent opacity-70 hover:opacity-100 hover:scale-[1.01]'
                            }
                          `}
                        >
                          <img src={style.image} alt={style.label} className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-105" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                          <div className="absolute inset-x-0 bottom-4 text-center">
                            <span className="text-white text-base md:text-lg font-bold">{style.label}</span>
                          </div>
                          {isSelected && (
                            <div className="absolute top-4 right-4 w-7 h-7 bg-[#e11d48] rounded-full flex items-center justify-center border border-white/10">
                              <Check className="w-4 h-4 text-white stroke-[3px]" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 2: Basic Portrait (Ethnicity & Age) */}
              {step === 2 && (
                <div className="space-y-6 md:space-y-8 w-full max-w-xl md:max-w-3xl mx-auto animate-in fade-in duration-300">
                  <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">Basic Portrait</h2>

                  {/* Field 1: Ethnicity */}
                  <div className="space-y-3 text-left">
                    <span className="text-xs font-bold text-white/40 uppercase tracking-widest">1. Choose Ethnicity</span>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {ETHNICITIES.map((eth) => {
                        const isSelected = ethnicity === eth.value;
                        return (
                          <button
                            key={eth.value}
                            onClick={() => setEthnicity(eth.value)}
                            className={`
                              group relative overflow-hidden rounded-xl aspect-[3/4] transition-all duration-300 border-2
                              ${isSelected ? 'border-[#e11d48] scale-102 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'}
                            `}
                          >
                            <img src={eth.image} alt={eth.label} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
                            <span className="absolute bottom-1.5 inset-x-0 text-center text-[10px] font-bold text-white leading-tight">{eth.label}</span>
                            {isSelected && (
                              <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#e11d48] rounded-full flex items-center justify-center">
                                <Check className="w-2.5 h-2.5 text-white" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Field 2: Age */}
                  <div className="space-y-3 text-left">
                    <span className="text-xs font-bold text-white/40 uppercase tracking-widest">2. Choose Age</span>
                    <div className="bg-white/5 border border-white/5 rounded-2xl p-5 space-y-4">
                      <div className="flex justify-between items-baseline">
                        <span className="text-white/40 text-[9px] font-bold uppercase tracking-widest">Age</span>
                        <span className="text-3xl font-black text-white tracking-tighter">{age} years</span>
                      </div>
                      <div className="relative h-2 bg-white/5 rounded-full mt-2">
                        <div
                          className="absolute inset-y-0 left-0 bg-[#e11d48] rounded-full shadow-[0_0_10px_rgba(225,29,72,0.4)]"
                          style={{ width: `${((age - 18) / 70) * 100}%` }}
                        />
                        <input
                          type="range"
                          min="18"
                          max="88"
                          value={age}
                          onChange={(e) => setAge(parseInt(e.target.value))}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                      <div className="flex justify-between text-[8px] font-bold text-white/20 tracking-wider">
                        <span>18 YEARS</span>
                        <span>88 YEARS</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Hair & Eyes (Hairstyle, Hair Color & Eye Color) */}
              {step === 3 && (
                <div className="space-y-6 md:space-y-8 w-full max-w-2xl md:max-w-4xl mx-auto animate-in fade-in duration-300">
                  <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">Hair & Eyes</h2>

                  {/* Field 1: Hairstyle */}
                  <div className="space-y-3 text-left">
                    <span className="text-xs font-bold text-white/40 uppercase tracking-widest">1. Hairstyle</span>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {HAIRSTYLES.map((style) => {
                        const isSelected = hairstyle === style.value;
                        return (
                          <button
                            key={style.value}
                            onClick={() => setHairstyle(style.value)}
                            className={`
                              relative py-2.5 rounded-xl border flex flex-col items-center justify-center transition-all duration-300 bg-gradient-to-br ${style.gradient}
                              ${isSelected ? 'border-[#e11d48] scale-102 shadow-md' : 'border-white/5 opacity-60 hover:opacity-100'}
                            `}
                          >
                            <span className="text-white font-bold text-xs tracking-wide">{style.label}</span>
                            {isSelected && (
                              <div className="absolute top-1 right-1 w-4.5 h-4.5 bg-[#e11d48] rounded-full flex items-center justify-center">
                                <Check className="w-2.5 h-2.5 text-white" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Field 2: Hair Color */}
                  <div className="space-y-3 text-left">
                    <span className="text-xs font-bold text-white/40 uppercase tracking-widest">2. Hair Color</span>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {HAIR_COLORS.map((hair) => {
                        const isSelected = hairColor === hair.value;
                        return (
                          <button
                            key={hair.value}
                            onClick={() => setHairColor(hair.value)}
                            className={`
                              relative rounded-xl aspect-[3/4] overflow-hidden border-2 transition-all duration-300
                              ${isSelected ? 'border-[#e11d48] scale-102 shadow-lg' : 'border-transparent opacity-65 hover:opacity-100'}
                            `}
                          >
                            <img src={hair.image} alt={hair.label} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
                            <span className="absolute bottom-1.5 inset-x-0 text-center text-[10px] font-bold text-white leading-tight">{hair.label}</span>
                            {isSelected && (
                              <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#e11d48] rounded-full flex items-center justify-center">
                                <Check className="w-2.5 h-2.5 text-white" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Field 3: Eye Color */}
                  <div className="space-y-3 max-w-xs sm:max-w-sm mx-auto w-full">
                    <span className="text-xs font-bold text-white/40 uppercase tracking-widest block text-left">3. Eye Color</span>
                    <div className="grid grid-cols-3 gap-2">
                      {EYE_COLORS.map((eye) => {
                        const isSelected = eyeColor === eye.value;
                        return (
                          <button
                            key={eye.value}
                            onClick={() => setEyeColor(eye.value)}
                            className={`
                              relative rounded-xl aspect-[3/4] overflow-hidden border-2 transition-all duration-300
                              ${isSelected ? 'border-[#e11d48] scale-102 shadow-lg' : 'border-transparent opacity-65 hover:opacity-100'}
                            `}
                          >
                            <img src={eye.image} alt={eye.label} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
                            <span className="absolute bottom-1.5 inset-x-0 text-center text-[10px] font-bold text-white leading-tight">{eye.label}</span>
                            {isSelected && (
                              <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#e11d48] rounded-full flex items-center justify-center">
                                <Check className="w-2.5 h-2.5 text-white" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Body Details (Body Type & Breast Size) */}
              {step === 4 && (
                <div className="space-y-6 md:space-y-8 w-full max-w-xl md:max-w-3xl mx-auto animate-in fade-in duration-300">
                  <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">Body Details</h2>

                  {/* Field 1: Body Type */}
                  <div className="space-y-3 text-left">
                    <span className="text-xs font-bold text-white/40 uppercase tracking-widest">1. Body Type</span>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {BODY_TYPES.map((body) => {
                        const isSelected = bodyType === body.value;
                        return (
                          <button
                            key={body.value}
                            onClick={() => setBodyType(body.value)}
                            className={`
                              relative rounded-xl aspect-[3/4] overflow-hidden border-2 transition-all duration-300
                              ${isSelected ? 'border-[#e11d48] scale-102 shadow-lg' : 'border-transparent opacity-65 hover:opacity-100'}
                            `}
                          >
                            <img src={body.image} alt={body.label} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
                            <span className="absolute bottom-1.5 inset-x-0 text-center text-[10px] font-bold text-white leading-tight">{body.label}</span>
                            {isSelected && (
                              <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#e11d48] rounded-full flex items-center justify-center">
                                <Check className="w-2.5 h-2.5 text-white" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Field 2: Breast Size */}
                  <div className="space-y-3 text-left">
                    <span className="text-xs font-bold text-white/40 uppercase tracking-widest">2. Breast Size</span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {BREAST_SIZES.map((breast) => {
                        const isSelected = breastSize === breast.value;
                        return (
                          <button
                            key={breast.value}
                            onClick={() => setBreastSize(breast.value)}
                            className={`
                              relative rounded-xl aspect-[3/4] overflow-hidden border-2 transition-all duration-300
                              ${isSelected ? 'border-[#e11d48] scale-102 shadow-lg' : 'border-transparent opacity-65 hover:opacity-100'}
                            `}
                          >
                            <img src={breast.image} alt={breast.label} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                            <div className="absolute bottom-2.5 inset-x-0 text-center flex flex-col items-center justify-center">
                              <span className="text-white font-bold text-xs sm:text-sm leading-none">{breast.label}</span>
                              <span className="text-white/60 text-[9px] sm:text-[10px] font-semibold mt-1">Size {breast.sizeText}</span>
                            </div>
                            {isSelected && (
                              <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#e11d48] rounded-full flex items-center justify-center">
                                <Check className="w-2.5 h-2.5 text-white" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Identity & Personality */}
              {step === 5 && (
                <div className="space-y-6 md:space-y-8 w-full max-w-xl md:max-w-4xl mx-auto animate-in fade-in duration-300 pb-20 max-h-[70vh] overflow-y-auto custom-scrollbar pr-2">
                  <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">Identity & Details</h2>

                  {/* Field 1: Name */}
                  <div className="grid grid-cols-3 gap-3 items-end">
                    <div className="col-span-2 space-y-2 text-left">
                      <span className="text-xs font-bold text-white/40 uppercase tracking-widest">1. Choose Name</span>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter name..."
                        maxLength={18}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/20 text-base font-bold focus:outline-none focus:border-[#e11d48] transition-all"
                      />
                    </div>
                    <button
                      onClick={() => {
                        const list = gender === "trans" ? RANDOM_TRANS_NAMES : RANDOM_GIRL_NAMES;
                        setName(list[Math.floor(Math.random() * list.length)]);
                      }}
                      className="h-[42px] rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2"
                    >
                      <Dices className="w-4 h-4" />
                      Random
                    </button>
                  </div>

                  {/* Field 2: Personality */}
                  <div className="space-y-3 text-left">
                    <span className="text-xs font-bold text-white/40 uppercase tracking-widest">2. Choose Personality</span>
                    <div className="flex flex-wrap gap-2 max-h-[160px] overflow-y-auto custom-scrollbar pr-2">
                      {PERSONALITY_TRAITS.map((trait) => {
                        const isSelected = selectedTraits.includes(trait.value);
                        return (
                          <button
                            key={trait.value}
                            onClick={() => handleTraitToggle(trait.value)}
                            className={`
                              px-4 py-2 rounded-xl font-bold text-xs tracking-tight border transition-all duration-200
                              ${isSelected
                                ? 'bg-[#e11d48] border-[#e11d48] text-white shadow-md scale-105'
                                : 'bg-white/5 border-white/5 text-white/50 hover:text-white hover:border-white/10 hover:scale-105'
                              }
                            `}
                          >
                            {trait.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Field 3: Relationship */}
                  <div className="space-y-3 text-left">
                    <span className="text-xs font-bold text-white/40 uppercase tracking-widest">3. Choose Relationship</span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[160px] overflow-y-auto custom-scrollbar pr-2">
                      {RELATIONSHIPS.map((rel) => {
                        const isSelected = relationship === rel.value;
                        return (
                          <button
                            key={rel.value}
                            onClick={() => setRelationship(rel.value)}
                            className={`
                              relative py-3.5 rounded-xl border-2 flex items-center justify-center bg-white/5 transition-all duration-300
                              ${isSelected ? 'border-[#e11d48] bg-[#e11d48]/10 scale-102' : 'border-white/5 opacity-60 hover:opacity-100 hover:scale-105'}
                            `}
                          >
                            <span className="text-white font-bold text-xs leading-none">{rel.label}</span>
                            {isSelected && (
                              <div className="absolute top-1 right-1 w-4 h-4 bg-[#e11d48] rounded-full flex items-center justify-center">
                                <Check className="w-2.5 h-2.5 text-white" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Field 4: Profession */}
                  <div className="space-y-3 text-left">
                    <span className="text-xs font-bold text-white/40 uppercase tracking-widest">4. Choose Profession</span>
                    <div className="flex flex-wrap gap-2 max-h-[200px] overflow-y-auto custom-scrollbar pr-2">
                      {PROFESSIONS.map((prof) => {
                        const isSelected = profession === prof;
                        return (
                          <button
                            key={prof}
                            onClick={() => setProfession(prof)}
                            className={`
                              px-4 py-2 rounded-xl font-bold text-xs tracking-tight border transition-all duration-200
                              ${isSelected
                                ? 'bg-[#e11d48] border-[#e11d48] text-white shadow-md scale-105'
                                : 'bg-white/5 border-white/5 text-white/50 hover:text-white hover:border-white/10 hover:scale-105'
                              }
                            `}
                          >
                            {prof}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Field 5: Fetishes */}
                  <div className="space-y-3 text-left">
                    <span className="text-xs font-bold text-white/40 uppercase tracking-widest">5. What Fetishes Do You Like?</span>
                    <div className="flex flex-wrap gap-2 max-h-[180px] overflow-y-auto custom-scrollbar pr-2">
                      {FETISHES.map((fetish) => {
                        const isSelected = selectedFetishes.includes(fetish);
                        return (
                          <button
                            key={fetish}
                            onClick={() => {
                              setSelectedFetishes(prev =>
                                prev.includes(fetish) ? prev.filter(t => t !== fetish) : [...prev, fetish]
                              );
                            }}
                            className={`
                              px-3 py-1.5 rounded-lg font-bold text-[10px] sm:text-xs tracking-tight border transition-all duration-200
                              ${isSelected
                                ? 'bg-[#e11d48] border-[#e11d48] text-white shadow-md scale-105'
                                : 'bg-white/5 border-white/5 text-white/50 hover:text-white hover:border-white/10 hover:scale-105'
                              }
                            `}
                          >
                            {fetish}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Field 6: Voice */}
                  <div className="space-y-3 text-left">
                    <span className="text-xs font-bold text-white/40 uppercase tracking-widest">6. Choose Voice</span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[180px] overflow-y-auto custom-scrollbar pr-2">
                      {VOICES.map((v) => {
                        const isSelected = voice === v.value;
                        return (
                          <button
                            key={v.value}
                            onClick={() => setVoice(v.value)}
                            className={`
                              relative p-3 rounded-xl border flex flex-col items-center justify-center bg-white/5 transition-all duration-300
                              ${isSelected ? 'border-[#e11d48] bg-[#e11d48]/10 scale-105 shadow-md' : 'border-white/5 opacity-60 hover:opacity-100 hover:scale-105'}
                            `}
                          >
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mb-2">
                              <Play className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-white font-bold text-xs leading-none">{v.label}</span>
                            {isSelected && (
                              <div className="absolute top-1 right-1 w-4 h-4 bg-[#e11d48] rounded-full flex items-center justify-center">
                                <Check className="w-2.5 h-2.5 text-white" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Stepper buttons */}
            <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#0a0a0f]/90 backdrop-blur-md border-t border-white/5 p-4 md:relative md:bottom-auto md:left-auto md:right-auto md:z-10 md:bg-transparent md:backdrop-blur-none md:border-none md:p-0 md:mt-10 flex flex-col gap-3 w-full md:max-w-md mx-auto">

              {/* Validation Error Message */}
              {validationError && (
                <div className="text-[#e11d48] font-bold text-xs tracking-wide uppercase text-center animate-in fade-in slide-in-from-bottom-2 duration-300">
                  ⚠️ {validationError}
                </div>
              )}

              <div className="flex justify-between items-center w-full">
                <button
                  onClick={prevStep}
                  disabled={step === 1}
                  className={`flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold transition-all text-sm ${step === 1
                    ? 'text-white/10 cursor-not-allowed opacity-30'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                >
                  <ArrowLeft size={16} strokeWidth={2.5} />
                  <span>Back</span>
                </button>

                <button
                  onClick={nextStep}
                  className={`flex items-center gap-2 px-10 py-3.5 bg-[#be123c] hover:bg-[#991b1b] text-white font-bold rounded-xl transition-all shadow-lg active:scale-95 text-sm ${!isStepValid(step) ? 'opacity-80 hover:opacity-100' : ''
                    }`}
                >
                  <span>{step === 5 ? "Create" : "Next"}</span>
                  <ArrowRight size={16} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- STEP 6: LOADER SCREEN --- */}
        {step === 6 && (
          <div className="max-w-xs w-full text-center z-10 space-y-8 animate-in fade-in duration-300">
            <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
              {/* Spinning outer loader */}
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r="50"
                  className="stroke-white/5 fill-none"
                  strokeWidth="6"
                />
                <circle
                  cx="56"
                  cy="56"
                  r="50"
                  className="stroke-[#e11d48] fill-none transition-all duration-300 ease-out"
                  strokeWidth="6"
                  strokeDasharray={2 * Math.PI * 50}
                  strokeDashoffset={2 * Math.PI * 50 * (1 - progress / 100)}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-black text-white">{progress}%</span>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-black text-white tracking-tight">
                Creating Your AI Companion
              </h3>
              <p className="text-white/40 text-sm font-medium">
                Hold on tight. This won't take long.
              </p>
              <p className="text-[#e11d48]/80 text-xs font-semibold italic mt-4">
                {loadingText}
              </p>
            </div>
          </div>
        )}

        {/* --- STEP 7: SUMMARY PAGE --- */}
        {step === 7 && (
          <div className="max-w-4xl w-full z-10 bg-white/5 border border-white/5 rounded-[2.5rem] p-6 md:p-8 flex flex-col md:flex-row gap-8 items-stretch animate-in scale-in duration-500">
            {/* Left side: Preview Image */}
            <div className="w-full md:w-1/2 aspect-[3/4] md:aspect-auto rounded-3xl overflow-hidden relative border border-white/10">
              <img
                src={previewImage ? (previewImage.startsWith("/uploads/") ? `${import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:3000'}${previewImage}` : previewImage) : (artStyle === "anime" ? animeGirlImg : realisticGirlImg)}
                alt="AI Girl Portrait"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

              {/* Badge overlay showing category/style */}
              <div className="absolute bottom-5 left-5 flex gap-2">
                <span className="px-3.5 py-1.5 bg-[#e11d48]/80 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                  {artStyle === "anime" ? "Anime" : "Realistic"}
                </span>
                <span className="px-3.5 py-1.5 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold text-white/80 uppercase tracking-wider">
                  {gender === "trans" ? "Trans" : "Girl"}
                </span>
              </div>
            </div>

            {/* Right side: Configuration Details */}
            <div className="w-full md:w-1/2 flex flex-col justify-between space-y-6">

              {/* Header Title */}
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                  {name}, {age}
                </h2>
                <div className="h-0.5 bg-white/10 rounded-full mt-3 w-16" />
              </div>

              {/* Traits checklist */}
              <div className="grid grid-cols-2 gap-3.5 my-2">
                {[
                  { label: "Body Type", val: BODY_TYPES.find(b => b.value === bodyType)?.label || bodyType },
                  { label: "Breast Size", val: BREAST_SIZES.find(b => b.value === breastSize)?.label || breastSize },
                  { label: "Ethnicity", val: ETHNICITIES.find(e => e.value === ethnicity)?.label || ethnicity },
                  { label: "Hairstyle", val: HAIRSTYLES.find(h => h.value === hairstyle)?.label || hairstyle },
                  { label: "Hair Color", val: HAIR_COLORS.find(h => h.value === hairColor)?.label || hairColor },
                  { label: "Eye Color", val: EYE_COLORS.find(e => e.value === eyeColor)?.label || eyeColor },
                  { label: "Relationship", val: RELATIONSHIPS.find(r => r.value === relationship)?.label || relationship },
                ].map((item, index) => (
                  <div key={index} className="p-3 bg-white/5 rounded-xl border border-white/5">
                    <span className="text-[9px] font-bold text-white/30 uppercase tracking-wider block mb-1">{item.label}</span>
                    <span className="text-white text-sm font-bold capitalize">{item.val}</span>
                  </div>
                ))}
              </div>

              {/* Personality traits */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider block">Personality Traits</span>
                <div className="flex flex-wrap gap-2">
                  {selectedTraits.map(traitVal => {
                    const label = PERSONALITY_TRAITS.find(p => p.value === traitVal)?.label || traitVal;
                    return (
                      <span key={traitVal} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white/80 text-xs font-bold capitalize">
                        {label}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Fetishes */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider block">Fetishes</span>
                <div className="flex flex-wrap gap-2">
                  {selectedFetishes.map(fetishVal => (
                    <span key={fetishVal} className="px-3 py-1.5 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-lg text-[10px] font-bold">
                      {fetishVal}
                    </span>
                  ))}
                </div>
              </div>

              {/* Extras (Profession, Voice) */}
              <div className="grid grid-cols-2 gap-3.5 my-2">
                <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <span className="text-[9px] font-bold text-white/30 uppercase tracking-wider block mb-1">Profession</span>
                  <span className="text-white text-sm font-bold capitalize">{profession}</span>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <span className="text-[9px] font-bold text-white/30 uppercase tracking-wider block mb-1">Voice</span>
                  <span className="text-white text-sm font-bold capitalize">{VOICES.find(v => v.value === voice)?.label || voice}</span>
                </div>
              </div>

              {/* Confirm / Action buttons */}
              <div className="pt-4 flex flex-col gap-3">
                <button
                  onClick={handleOżyw}
                  className="w-full py-4.5 bg-[#e11d48] hover:bg-[#be123c] text-white font-black uppercase text-sm tracking-widest rounded-2xl transition-all shadow-lg active:scale-[0.98] shadow-[#e11d48]/10"
                >
                  Revive my girlfriend
                </button>
                <button
                  onClick={handleReset}
                  className="w-full py-3 bg-transparent border border-white/10 hover:bg-white/5 text-white/60 hover:text-white font-bold uppercase text-xs tracking-widest rounded-xl transition-all active:scale-[0.98]"
                >
                  Start Over
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- PREMIUM FEATURE & PLAN SELECTOR OVERLAYS --- */}
        {showPremiumOverlay && (
          <div className="fixed inset-0 z-50 bg-[#0a0a0f]/95 backdrop-blur-md overflow-y-auto animate-in fade-in duration-300">
            <div className="min-h-screen w-full flex items-center justify-center md:p-8">
              <div className="bg-[#12121a] border border-white/5 rounded-[2.5rem] w-full max-w-4xl overflow-hidden relative flex flex-col md:flex-row shadow-2xl my-auto">

                {/* Close Button */}
                <button
                  onClick={() => setShowPremiumOverlay(false)}
                  className="absolute top-6 right-6 z-20 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white/60 hover:text-white transition-all duration-200 border border-white/5"
                >
                  <X size={18} />
                </button>

                {/* Overlay view 1: Benefits Promo */}
                {premiumView === "benefits" && (
                  <>
                    {/* Left Column: Image of model */}
                    <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-[500px]">
                      <img
                        src={realisticGirlImg}
                        alt="Premium Girl"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
                    </div>

                    {/* Right Column: Benefits checkmarks */}
                    <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center space-y-8">
                      <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                          <Crown className="w-3 h-3" /> Premium
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tight">
                          Become Premium and generate more!
                        </h2>
                      </div>

                      {/* Features checklist */}
                      <div className="space-y-4">
                        {[
                          { title: "Generate unlimited AI characters", iconColor: "text-amber-400" },
                          { title: "Generate the most spicy photos and videos", iconColor: "text-[#e11d48]" },
                          { title: "Chat, flirt, control", iconColor: "text-[#e11d48]" }
                        ].map((item, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                              <Check className="w-4 h-4 text-emerald-400 stroke-[3px]" />
                            </div>
                            <span className="text-white/80 font-bold text-sm tracking-tight">{item.title}</span>
                          </div>
                        ))}
                      </div>

                      {/* Action button */}
                      <div className="pt-2">
                        <button
                          onClick={() => setPremiumView("plans")}
                          className="w-full py-4.5 bg-[#e11d48] hover:bg-[#be123c] text-white font-black uppercase text-sm tracking-widest rounded-2xl transition-all shadow-lg shadow-[#e11d48]/20"
                        >
                          Become Premium
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {/* Overlay view 2: Plan Selectors */}
                {premiumView === "plans" && (
                  <div className="w-full  md:p-10 flex flex-col items-center space-y-8 animate-in fade-in duration-300">
                    <div className="text-center space-y-2">
                      <h2 className="text-3xl font-black text-white tracking-tight">Choose your plan</h2>
                      <p className="text-white/40 text-xs tracking-wide font-medium">Trusted by 50 million people worldwide</p>
                    </div>

                    {/* Plan Options Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
                      {plans.map((plan) => (
                        <div
                          key={plan.id}
                          className="bg-white/5 border border-white/5 rounded-3xl p-6 relative flex flex-col justify-between space-y-6 hover:border-white/10 transition-all duration-300"
                        >
                          {plan.badge && (
                            <span className="absolute -top-3 left-6 bg-[#e11d48] text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                              {plan.badge}
                            </span>
                          )}

                          <div className="space-y-2">
                            <h3 className="text-white font-bold text-base tracking-wide">{plan.title}</h3>
                            {plan.discount && (
                              <span className="text-[10px] font-black text-[#e11d48] uppercase tracking-wider">{plan.discount}</span>
                            )}
                            <div className="pt-2">
                              <span className="text-3xl font-black text-white">${plan.price}</span>
                              <span className="text-white/30 text-xs"> / monthly</span>
                            </div>
                            <p className="text-white/30 text-[10px] font-medium pt-1">Billed annually as {plan.billText}</p>
                          </div>

                          <button
                            onClick={() => {
                              setCheckoutPlanId(plan.id);
                              setPremiumView("checkout");
                            }}
                            className="w-full py-3 bg-[#e11d48] hover:bg-[#be123c] text-white font-bold text-xs tracking-wider uppercase rounded-xl transition-all shadow-md active:scale-95"
                          >
                            Get Started
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Pricing Benefits Checkmarks */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3 pt-6 border-t border-white/5 w-full max-w-2xl text-left">
                      {[
                        { text: "Create your own AI girls", icon: <User className="w-4 h-4 text-amber-400" /> },
                        { text: "Full live-action experience", icon: <Flame className="w-4 h-4 text-[#e11d48]" /> },
                        { text: "Generate 18+ videos", icon: <Gem className="w-4 h-4 text-[#e11d48]" /> },
                        { text: "Unlimited text messages", icon: <MessageCircle className="w-4 h-4 text-blue-400" /> },
                        { text: "Generate 18+ images", icon: <Sparkle className="w-4 h-4 text-emerald-400" /> },
                        { text: "100 monthly tokens", icon: <Crown className="w-4 h-4 text-yellow-400" /> }
                      ].map((benefit, i) => (
                        <div key={i} className="flex items-center gap-2.5">
                          <div className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                            {benefit.icon}
                          </div>
                          <span className="text-white/70 text-xs font-semibold tracking-tight">{benefit.text}</span>
                        </div>
                      ))}
                    </div>

                    {/* Footers */}
                    <div className="flex flex-col md:flex-row justify-center items-center gap-x-6 gap-y-2 pt-4 text-[10px] text-white/20 font-bold uppercase tracking-wider w-full border-t border-white/5">
                      <div className="flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-emerald-500/50" />
                        <span>Charge will appear as "EverAI" on bank statement</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-500/50" />
                        <span>Cancel subscription anytime in settings</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Overlay view 3: Stripe Embedded Checkout */}
                {premiumView === "checkout" && (
                  <div className="w-full flex flex-col items-center space-y-6 animate-in fade-in duration-300">
                    <div className="flex items-center justify-between w-full border-b border-white/5 pb-4">
                      <button
                        onClick={() => setPremiumView("plans")}
                        className="flex items-center gap-2 text-white/50 hover:text-white font-bold text-xs uppercase tracking-wider transition-colors"
                      >
                        <ArrowLeft size={14} strokeWidth={2.5} />
                        Back to plans
                      </button>
                      <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Secure Payment</span>
                    </div>

                    <div className="w-full max-w-md bg-[#12121a] rounded-3xl overflow-hidden p-2">
                      <StripeEmbeddedCheckout
                        selectedPlan={checkoutPlanId}
                        onClose={() => setPremiumView("plans")}
                      />
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        )}

        {/* --- LOGIN MODAL --- */}
        <LoginModal open={showLoginModal} onClose={() => setShowLoginModal(false)} />

      </div>

      {/* Hide default HTML sliders thumb styles to style it nicely */}
      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #ffffff;
          border: 4px solid #e11d48;
          box-shadow: 0 0 10px rgba(225, 29, 72, 0.4);
          cursor: pointer;
          transition: transform 0.15s ease;
        }
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.1);
        }
        input[type="range"]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #ffffff;
          border: 4px solid #e11d48;
          box-shadow: 0 0 10px rgba(225, 29, 72, 0.4);
          cursor: pointer;
          transition: transform 0.15s ease;
        }
        input[type="range"]::-moz-range-thumb:hover {
          transform: scale(1.1);
        }
      `}</style>
    </Layout>
  );
}

// Category lists with helper constants
const CATEGORIES_BUTTONS = [
  { id: "girl", label: "Girls" },
  { id: "trans", label: "Trans" }
];

const STYLES = [
  { id: "realistic", label: "Realistic", image: realisticGirlImg },
  { id: "anime", label: "Anime", image: animeGirlImg }
];
