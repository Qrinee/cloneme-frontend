import { useNavigate } from "react-router-dom";
import { useAuthFetch } from "../utils/authFetch";
import Layout from "../components/Layout";
import DialogPremium from "../components/DialogPremium";
import { Dialog } from "@/components/ui/dialog";
import Content from "../components/Content";
import { useLayoutContext } from "../components/LayoutContext";
import DialogLoginPrompt from "../components/DialogLoginPrompt";
import { 
  ArrowRight, ArrowLeft, Heart, Sparkles, Wand2, 
  Eye, Smile, User, MessageCircle, Play, Lock, Crown,
  Check, ChevronRight, Palette, Gem, Music, Camera, Star,
  Droplets, Sun, Moon, Flame, Snowflake, Wind
} from "lucide-react";



import africanEthnicity from '../assets/create/ethnicity/african.png';
import asianEthnicity from '../assets/create/ethnicity/asian.png';
import europeanEthnicity from '../assets/create/ethnicity/european.png';
import latinaEthnicity from '../assets/create/ethnicity/latina.png';
import arabicEthnicity from '../assets/create/ethnicity/arabic.png';

import brownHair from '../assets/create/hair/brown.png';
import blondeHair from '../assets/create/hair/blonde.png';
import redHair from '../assets/create/hair/redhair.png';
import blackHair from '../assets/create/hair/black.png';
import pinkHair from '../assets/create/hair/pink.png';
import silverHair from '../assets/create/hair/silver.png';

import hazelEyes from '../assets/create/eyes/hazel.png'
import blueEyes from '../assets/create/eyes/blue.png'
import greenEyes from '../assets/create/eyes/green.png'
import brownEyes from '../assets/create/eyes/brown.png'
import purpleEyes from '../assets/create/eyes/purple.png'
import blackEyes from '../assets/create/eyes/black.png'

import athleticBody from '../assets/create/body/athletic.png';
import curvyBody from '../assets/create/body/curvy.png';
import petiteBody from '../assets/create/body/petite.png';
import slimBody from '../assets/create/body/slim.png';
import thickBody from '../assets/create/body/thick.png';
import { useEffect, useState } from "react";


const steps = [
  { id: 1, title: "Hair", icon: Sparkles },
  { id: 2, title: "Eyes", icon: Eye },
  { id: 3, title: "Body", icon: User },
  { id: 4, title: "Ethnicity", icon: Gem },
  { id: 5, title: "Info", icon: User },
  { id: 6, title: "Personality", icon: Smile },
  { id: 7, title: "Preview", icon: Sparkles },
];


const hairColors = [
  { value: "brunette", label: "Brunette", image: brownHair },
  { value: "blonde", label: "Blonde", image: blondeHair },
  { value: "redhead", label: "Redhead", image: redHair },
  { value: "black", label: "Black", image: blackHair },
  { value: "pink", label: "Pink", image: pinkHair },
  { value: "silver", label: "Silver", image: silverHair },
];

const actions = [
  { _id: "kiss", label: "Kiss", messagesNeeded: 5, premium: false },
  { _id: "hug", label: "Hug", messagesNeeded: 5, premium: false },
  { _id: "flirt", label: "Flirt", messagesNeeded: 10, premium: false },
  { _id: "dance", label: "Dance", messagesNeeded: 15, premium: true },
  { _id: "sing", label: "Sing", messagesNeeded: 20, premium: true },
  { _id: "joke", label: "Tell a Joke", messagesNeeded: 10, premium: false },
  { _id: "compliment", label: "Give Compliment", messagesNeeded: 10, premium: false },
  { _id: "confess", label: "Confess Love", messagesNeeded: 50, premium: true },
  { _id: "roleplay", label: "Roleplay Scenario", messagesNeeded: 30, premium: true },
  { _id: "custommessage", label: "Custom Message", messagesNeeded: 20, premium: false },
];


const tags = [
  { _id: "sensual", label: "Sensual" },
  { _id: "romantic", label: "Romantic" },
  { _id: "flirty", label: "Flirty" },
  { _id: "cute", label: "Cute" },
  { _id: "shy", label: "Shy" },
  { _id: "teasing", label: "Teasing" },
  { _id: "experienced", label: "Experienced" },
  { _id: "bold", label: "Bold" },
  { _id: "daring", label: "Daring" },
]

const eyeColors = [
  { value: "blue", label: "Blue", image: blueEyes },
  { value: "green", label: "Green", image: greenEyes },
  { value: "brown", label: "Brown", image: brownEyes },
  { value: "hazel", label: "Hazel", image: hazelEyes },
  { value: "purple", label: "Purple", image: purpleEyes },
  { value: "black", label: "Black", image: blackEyes },
];

const relationshipOptions = [
  { value: "girlfriend", label: "Girlfriend" },
  { value: "sexfriend", label: "Sex Friend" },
  { value: "schoolmate", label: "School Mate" },
  { value: "workcolleague", label: "Work Colleague" },
  { value: "wife", label: "Wife" },
  { value: "stranger", label: "Stranger" },
  { value: "mistress", label: "Mistress" },
  { value: "friend", label: "Friend" },
  { value: "stepsister", label: "Step Sister" },
  { value: "stepmom", label: "Step Mom" }
];
const bodyTypes = [
  { value: "slim", label: "Slim & Toned", image: slimBody },
  { value: "curvy", label: "Curvy & Sexy", image: curvyBody },
  { value: "athletic", label: "Athletic", image: athleticBody },
  { value: "petite", label: "Petite & Cute", image: petiteBody },
  { value: "thick", label: "Thick & Juicy", image: thickBody },
];

const ethnicities = [
  { value: "asian", label: "Asian", image: asianEthnicity },
  { value: "latina", label: "Latina", image: latinaEthnicity },
  { value: "european", label: "European", image: europeanEthnicity },
  { value: "african", label: "African", image: africanEthnicity },
  { value: "arabic", label: "Middle Eastern", image: arabicEthnicity },

];



// Image Tile Component
function ImageTile({ item, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-3xl aspect-[3/4] transition-all duration-500
        border-2 ${isSelected ? 'border-[#741818]' : 'border-transparent opacity-60 hover:opacity-100'}
      `}
    >
      <img 
        src={item.image} 
        alt={item.label}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#0a0a0f] to-transparent">
        <span className="text-white font-bold text-sm tracking-tight">{item.label}</span>
      </div>

      {isSelected && (
        <div className="absolute top-4 right-4 w-8 h-8 bg-[#741818] rounded-full flex items-center justify-center">
          <Check className="w-5 h-5 text-white" />
        </div>
      )}
    </button>
  );
}

// Age Slider Component
function AgeSlider({ value, onChange }) {
  return (
    <div className="w-full py-6">
      <div className="flex justify-between items-center mb-6">
        <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Target Age</span>
        <div className="flex items-center gap-2">
          <span className="text-4xl font-bold text-white tracking-tighter">{value}</span>
          <span className="text-white/20 text-xs font-medium">years</span>
        </div>
      </div>
      
      <div className="relative h-2 bg-white/5 rounded-full">
        <div 
          className="absolute inset-y-0 left-0 bg-[#741818] rounded-full"
          style={{ width: `${((value - 18) / (35 - 18)) * 100}%` }}
        />
        <input
          type="range"
          min={18}
          max={35}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
      
      <div className="flex justify-between mt-4 text-[10px] font-bold text-white/10 tracking-widest uppercase">
        <span>18</span>
        <span>35</span>
      </div>
    </div>
  );
}

export default function CreateGirlPage() {
  const navigate = useNavigate();
  const authFetch = useAuthFetch();
  const { updateUser, premium, canCreateGirlfriend, setCanCreateGirlfriend, lastGirlfriendCreated, setLastGirlfriendCreated, isLoggedIn } = useLayoutContext();
  
  const getInitialState = () => {
    const saved = localStorage.getItem('createGirlState');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { currentStep: parsed.currentStep || 1, formData: parsed.formData };
      } catch (e) {
        return { currentStep: 1, formData: null };
      }
    }
    return { currentStep: 1, formData: null };
  };
  
  const initialState = getInitialState();
  const [currentStep, setCurrentStep] = useState(initialState.currentStep);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [formData, setFormData] = useState(initialState.formData || {
    hairColor: null,
    eyeColor: null,
    bodyType: null,
    ethnicity: null,
    name: '',
    age: 18,
    bio: '',
    relationship: null,
    initialMessage: '',
    tags: [],
    actions: [],
  });
  const [notification, setNotification] = useState(null);
  const [showPremiumDialog, setShowPremiumDialog] = useState(false);

  const clearSavedState = () => {
    localStorage.removeItem('createGirlState');
  };

  useEffect(() => {
    const state = { currentStep, formData };
    localStorage.setItem('createGirlState', JSON.stringify(state));
  }, [currentStep, formData]);

  useEffect(() => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
    }
  }, [isLoggedIn]);


  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleTag = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: (prev.tags || []).includes(tag) 
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const toggleAction = (actionId) => {
    setFormData(prev => ({
      ...prev,
      actions: (prev.actions || []).includes(actionId)
        ? prev.actions.filter(id => id !== actionId)
        : [...prev.actions, actionId]
    }));
  };

  const canProceed = () => {
    switch(currentStep) {
      case 1: return formData.hairColor;
      case 2: return formData.eyeColor;
      case 3: return formData.bodyType;
      case 5: return formData.name && formData.age && formData.bio;
      case 6: return formData.relationship && formData.initialMessage;
      case 7: return true; // Preview step - always valid
      default: return true;
    }
  };

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white tracking-tighter">Hair Aesthetics</h2>
              <p className="text-white/30 mt-2 font-medium">Select the signature style for your companion.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {hairColors.map((color) => (
                <ImageTile
                  key={color.value}
                  item={color}
                  isSelected={formData.hairColor === color.value}
                  onClick={() => updateFormData("hairColor", color.value)}
                />
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white tracking-tighter">Ocular Hue</h2>
              <p className="text-white/30 mt-2 font-medium">Choose the depth and color of her gaze.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {eyeColors.map((color) => (
                <ImageTile
                  key={color.value}
                  item={color}
                  isSelected={formData.eyeColor === color.value}
                  onClick={() => updateFormData("eyeColor", color.value)}
                />
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white tracking-tighter">Physique Type</h2>
              <p className="text-white/30 mt-2 font-medium">Define the silhouette of your perfect match.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {bodyTypes.map((type) => (
                <ImageTile
                  key={type.value}
                  item={type}
                  isSelected={formData.bodyType === type.value}
                  onClick={() => updateFormData("bodyType", type.value)}
                />
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white tracking-tighter">Ethnicity</h2>
              <p className="text-white/30 mt-2 font-medium">Optionally define her heritage and background.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {ethnicities.map((eth) => (
                <ImageTile
                  key={eth.value}
                  item={eth}
                  isSelected={formData.ethnicity === eth.value}
                  onClick={() => updateFormData("ethnicity", eth.value)}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrentStep(prev => prev + 1)}
              className="w-full py-6 text-white/30 hover:text-white uppercase text-[10px] font-bold tracking-[0.2em] transition-all"
            >
              Skip this discovery
            </button>
          </div>
        );

      case 5:
        return (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white tracking-tighter">Identity</h2>
              <p className="text-white/30 mt-2 font-medium">Provide a name and a narrative for her essence.</p>
            </div>
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest block ml-1">Designation</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateFormData("name", e.target.value)}
                  placeholder="Enter her name..."
                  className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-5 text-white placeholder-white/20 focus:outline-none focus:border-[#741818] transition-all text-xl font-bold tracking-tight"
                />
              </div>

              <AgeSlider
                value={formData.age}
                onChange={(value) => updateFormData("age", value)}
              />

              <div className="space-y-3">
                <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest block ml-1">Narrative</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => updateFormData("bio", e.target.value)}
                  placeholder="What is her story?"
                  rows={4}
                  className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-5 text-white placeholder-white/20 focus:outline-none focus:border-[#741818] transition-all resize-none leading-relaxed font-medium"
                />
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white tracking-tighter">Personality</h2>
              <p className="text-white/30 mt-2 font-medium">Fine-tune her behavior and initial reception.</p>
            </div>
            <div className="space-y-10">
              <div className="space-y-4">
                <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest block ml-1">Core Traits</label>
                <div className="flex flex-wrap gap-3">
                  {tags.map((tag) => (
                    <button
                      key={tag._id}
                      onClick={() => toggleTag(tag._id)}
                      className={`px-6 py-3.5 rounded-2xl font-bold text-xs tracking-tight transition-all border ${
                        (formData.tags || []).includes(tag._id)
                          ? 'bg-[#741818] border-[#741818] text-white'
                          : 'bg-white/5 border-white/5 text-white/40 hover:text-white hover:border-white/10'
                      }`}
                    >
                      {tag.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest block ml-1">Relationship</label>
                <div className="flex flex-wrap gap-3">
                  {relationshipOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateFormData("relationship", option.value)}
                      className={`px-6 py-3.5 rounded-2xl font-bold text-xs tracking-tight transition-all border ${
                        formData.relationship === option.value
                          ? 'bg-[#741818] border-[#741818] text-white'
                          : 'bg-white/5 border-white/5 text-white/40 hover:text-white hover:border-white/10'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest block ml-1">Opening Reception</label>
                <textarea
                  value={formData.initialMessage}
                  onChange={(e) => updateFormData("initialMessage", e.target.value)}
                  placeholder="The first words she will speak..."
                  rows={3}
                  className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-5 text-white placeholder-white/20 focus:outline-none focus:border-[#741818] transition-all resize-none leading-relaxed font-medium"
                />
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center">
              <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tighter">Synthesis Complete</h2>
              <p className="text-white/30 mt-2 font-medium text-sm md:text-base">Review the essence of your creation.</p>
            </div>

            <div className="bg-white/5 rounded-[2rem] md:rounded-[2.5rem] p-4 md:p-8 border border-white/5">
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 mb-6 md:mb-8">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative overflow-hidden flex-shrink-0">
                  <User className="w-8 h-8 md:w-10 md:h-10 text-white/20" />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-xl md:text-3xl font-bold text-white tracking-tighter">{formData.name || "Nameless Essence"}</h3>
                  <p className="text-white/40 font-bold text-xs uppercase tracking-widest mt-1">
                    {formData.age} Years Old • {formData.ethnicity || "Unknown origin"} • {formData.relationship || "Relationship undefined"}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 md:gap-4 mb-6 md:mb-8">
                {[
                  { label: "Visual", val: formData.hairColor },
                  { label: "Gaze", val: formData.eyeColor },
                  { label: "Physique", val: formData.bodyType }
                ].map((stat, i) => (
                  <div key={i} className="bg-white/5 rounded-xl md:rounded-2xl p-2 md:p-4 border border-white/5 text-center">
                    <span className="text-[8px] md:text-[10px] font-bold text-white/20 uppercase tracking-widest block mb-1">{stat.label}</span>
                    <p className="text-white text-sm md:text-base font-bold tracking-tight capitalize">{stat.val || "—"}</p>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4 md:space-y-6">
                <div className="p-4 md:p-6 bg-white/5 rounded-xl md:rounded-2xl border border-white/5 italic text-white/70 leading-relaxed font-medium text-sm md:text-base">
                  "{formData.bio || "Her story remains unwritten..."}"
                </div>
                
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {formData.tags.map(tagId => {
                    const tag = tags.find(t => t._id === tagId);
                    return tag ? (
                      <span key={tagId} className="px-3 py-1.5 md:px-4 md:py-2 bg-[#741818]/20 border border-[#741818]/20 rounded-lg md:rounded-xl text-white text-[9px] md:text-[10px] font-bold uppercase tracking-widest">
                        {tag.label}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-[#0a0a0f] py-12 px-6 overflow-hidden">
        <div className="max-w-3xl mx-auto">
          {/* Progress Tracker - Modern Glass */}
          <div className="bg-white/5 backdrop-blur-2xl border border-white/5 p-2 md:p-4 rounded-[2rem] md:rounded-[2.5rem] mb-8 md:mb-12 overflow-x-auto no-scrollbar">
            <div className="flex items-center justify-between min-w-max px-1 md:px-2">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center gap-2 md:gap-3">
                    <div className={`
                      w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-500
                      ${currentStep === step.id 
                        ? 'bg-[#741818] text-white' 
                        : currentStep > step.id 
                          ? 'bg-white/10 text-white' 
                          : 'bg-white/5 text-white/20'}
                    `}>
                      <step.icon size={14} md:size={18} strokeWidth={currentStep === step.id ? 2.5 : 2} />
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-4 md:w-8 h-px mx-1 md:mx-4 ${currentStep > step.id ? 'bg-[#741818]' : 'bg-white/5'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content Area */}
          <div className="bg-white/5 backdrop-blur-3xl rounded-[2rem] md:rounded-[3rem] p-6 md:p-14 border border-white/5 relative overflow-hidden mb-8 md:mb-10">
            {/* Subtle light effect inside */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#741818]/5 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="relative z-10">
              {renderStep()}
            </div>
          </div>

          {/* Nav Buttons */}
          <div className="flex justify-between items-center bg-white/5 p-2 md:p-3 rounded-[2rem] md:rounded-[2.5rem] border border-white/5">
            <button
              onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 md:gap-3 px-4 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold transition-all text-sm md:text-base ${
                currentStep === 1 
                  ? 'text-white/10 cursor-not-allowed opacity-50' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <ArrowLeft size={16} md:size={20} strokeWidth={3} />
              <span className="hidden md:inline">Return</span>
            </button>

            {currentStep < 7 ? (
              <button
                onClick={() => setCurrentStep(prev => prev + 1)}
                disabled={!canProceed()}
                className={`flex items-center gap-2 md:gap-3 px-6 md:px-10 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold transition-all text-sm md:text-base ${
                  canProceed()
                    ? 'bg-[#741818] text-white hover:bg-[#8d1d1d] active:scale-95'
                    : 'bg-white/5 text-white/10 cursor-not-allowed'
                }`}
              >
                <span className="hidden md:inline">Continue</span>
                <span className="md:hidden text-xs">Next</span>
                <ArrowRight size={16} md:size={20} strokeWidth={3} />
              </button>
            ) : (
              <button
                onClick={async () => {
                  try {
                    setIsSubmitting(true);
                    const res = await authFetch(`${import.meta.env.VITE_API_URL}/girlfriends`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(formData)
                    });
                    const data = await res.json();
                    
                    if (data.type === "success") {
                      clearSavedState();
                      // Update points in Layout
                      if (data.remainingPoints !== undefined) {
                        updateUser({ points: data.remainingPoints });
                      }
                      // Update girlfriend creation status for premium
                      if (data.canCreateGirlfriend !== undefined) {
                        setCanCreateGirlfriend(data.canCreateGirlfriend);
                      }
                      if (data.lastGirlfriendCreated) {
                        setLastGirlfriendCreated(data.lastGirlfriendCreated);
                      }
                      // Show success notification
                      setNotification({
                        type: 'success',
                        message: data.message,
                        points: data.remainingPoints
                      });
                      setTimeout(() => window.location.href = '/premium', 2000);
                    } else {
                      // Not enough points, limit exceeded, or premium required - show appropriate dialog
                      if (data?.message?.includes("Premium subscription required")) {
                        navigate('/premium');
                      } else if (data?.message?.includes("Not enough points") || data?.message?.includes("need") || data?.message?.includes("already used")) {
                        setShowPremiumDialog(true);
                        // Update state if limit reached
                        if (data.canCreateGirlfriend !== undefined) {
                          setCanCreateGirlfriend(data.canCreateGirlfriend);
                        }
                      } else {
                        setNotification({
                          type: 'error',
                          message: data.message
                        });
                      }
                    }
                  } catch (err) {
                    console.error(err);
                    setNotification({
                      type: 'error',
                      message: "An error occurred during synthesis"
                    });
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
                disabled={isSubmitting || (premium?.isActive && !canCreateGirlfriend)}
                className="flex items-center gap-2 md:gap-3 px-6 md:px-12 py-3 md:py-4 bg-white text-black font-bold rounded-xl md:rounded-2xl hover:bg-white/90 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
              >
                {isSubmitting ? "Synthesizing..." : (premium?.isActive ? (canCreateGirlfriend ? "Create (FREE)" : "Create (1/mo)") : "Bring to Life")}
                <Heart size={16} md:size={20} fill="currentColor" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-2xl border shadow-2xl animate-in slide-in-from-top-2 ${
          notification.type === 'success' 
            ? 'bg-green-900/90 border-green-500/50 text-green-100' 
            : 'bg-red-900/90 border-red-500/50 text-red-100'
        }`}>
          <div className="flex items-center gap-3">
            {notification.type === 'success' ? (
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            )}
            <div>
              <p className="font-bold text-sm">{notification.message}</p>
              {notification.type === 'success' && notification.points !== undefined && (
                <p className="text-xs text-green-300/70 mt-1">Remaining points: {notification.points}</p>
              )}
              {notification.type === 'error' && notification.current !== undefined && (
                <p className="text-xs text-red-300/70 mt-1">
                  You have {notification.current} points, need {notification.required}
                </p>
              )}
            </div>
            <button 
              onClick={() => setNotification(null)}
              className="ml-4 p-1 hover:bg-white/10 rounded"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

      `}</style>

      {/* Premium Dialog for insufficient points */}
      {showPremiumDialog && (
        <Dialog open={showPremiumDialog} onOpenChange={setShowPremiumDialog}>
          <Content />
        </Dialog>
      )}

      {/* Login Prompt Dialog for non-logged in users */}
      <DialogLoginPrompt 
        open={showLoginPrompt}
        onOpenChange={setShowLoginPrompt}
        onLogin={() => {
          setShowLoginPrompt(false);
          navigate("/login");
        }}
        onMaybeLater={() => {
          setShowLoginPrompt(false);
          navigate("/");
        }}
      />
    </Layout>
  );
}
