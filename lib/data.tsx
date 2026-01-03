const exercises = {
  categories: [
    {
      "id": "hand_wrist",
      "category_name": "Hands",
      "category_icon_name": 'hand-back-left',
      "target_area": "Carpal Tunnel & RSI Prevention",
      "exercises": [
        {
          "id": 1,
          "name": "Prayer Stretch",
          "description": "Place palms together at chest height. Lower hands towards your waist without separating palms.",
          "benefit": "Stretches the inner wrists and forearms.",
          "lightSource": require("@/assets/thumbnails/light/prayer-stretch.png"),
          "darkSource": require("@/assets/thumbnails/dark/prayer-stretch.png")
        },
        {
          "id": 2,
          "name": "Reverse Prayer",
          "description": "Place the backs of your hands together at chest height and gently push elbows downwards.",
          "benefit": "Stretches the outer wrist muscles.",
          "lightSource": require("@/assets/thumbnails/light/reverse-prayer.png"),
          "darkSource": require("@/assets/thumbnails/dark/reverse-prayer.png")
        },
        {
          "id": 3,
          "name": "Stop Sign",
          "description": "Extend arm forward, palm facing out. Gently pull fingers back towards you with the other hand. (Wrist Extensor)",
          "benefit": "Lengthens forearm muscles.",
          "lightSource": require("@/assets/thumbnails/light/stop-sign.png"),
          "darkSource": require("@/assets/thumbnails/dark/stop-sign.png")
        },
        {
          "id": 4,
          "name": "Zombie Wrist",
          "description": "Extend arm forward, let the hand dangle down. Gently press on the back of the hand. (Wrist Flexor)",
          "benefit": "Relieves tension on the top of the wrist.",
          "lightSource": require("@/assets/thumbnails/light/zombie-wrist.png"),
          "darkSource": require("@/assets/thumbnails/dark/zombie-wrist.png")
        },
        {
          "id": 5,
          "name": "Wrist Circles",
          "description": "Make fists and rotate wrists slowly clockwise, then counter-clockwise.",
          "benefit": "Increases joint mobility.",
          "lightSource": require("@/assets/thumbnails/light/wrist-circles.png"),
          "darkSource": require("@/assets/thumbnails/dark/wrist-circles.png")
        },
        {
          "id": 6,
          "name": "Piano Fingers",
          "description": "Place fingers on the desk and lift/tap them individually as if playing a fast piano piece.",
          "benefit": "Activates finger tendons independently.",
          "lightSource": require("@/assets/thumbnails/light/piano-fingers.png"),
          "darkSource": require("@/assets/thumbnails/dark/piano-fingers.png")
        },
        {
          "id": 7,
          "name": "Thumb Stretch",
          "description": "Tuck thumb inside your fist. Gently tilt your wrist downwards towards the pinky side. (Finkelstein)",
          "benefit": "Tests for and stretches muscles related to De Quervain's Tenosynovitis.",
          "lightSource": require("@/assets/thumbnails/light/thumb-stretch.png"),
          "darkSource": require("@/assets/thumbnails/dark/thumb-stretch.png")
        },
        {
          "id": 8,
          "name": "Rubber Band Expansion",
          "description": "Place a rubber band around your fingers. Open your hand against the resistance.",
          "benefit": "Strengthens finger extensor muscles.",
          "lightSource": require("@/assets/thumbnails/light/rubber-band-expansion.png"),
          "darkSource": require("@/assets/thumbnails/dark/rubber-band-expansion.png")
        },
        {
          "id": 9,
          "name": "Palm Massage",
          "description": "Use one thumb to massage the fleshy parts of the opposite palm in circular motions.",
          "benefit": "Releases palm spasms and tension.",
          "lightSource": require("@/assets/thumbnails/light/palm-massage.png"),
          "darkSource": require("@/assets/thumbnails/dark/palm-massage.png")
        },
        {
          "id": 10,
          "name": "The Shake Out",
          "description": "Let hands hang loose at your sides and shake them vigorously for 10 seconds.",
          "benefit": "Accelerates blood flow to extremities.",
          "lightSource": require("@/assets/thumbnails/light/the-shake-out.png"),
          "darkSource": require("@/assets/thumbnails/dark/the-shake-out.png")
        }
      ]
    },
    {
      "id": "neck_head",
      "category_name": "Head",
      "category_icon_name": 'head',
      "target_area": "Tech Neck & Headaches",
      "exercises": [
        {
          "id": 1,
          "name": "Chin Tuck",
          "description": "Look straight ahead. Pull your chin straight back (like making a double chin) without tilting your head.",
          "benefit": "Corrects forward head posture and aligns cervical spine.",
          "lightSource": require("@/assets/thumbnails/light/chin-tuck.png"),
          "darkSource": require("@/assets/thumbnails/dark/chin-tuck.png")
        },
        {
          "id": 2,
          "name": "Ear to Shoulder",
          "description": "Drop right ear to right shoulder. Use right hand to apply very gentle weight to the left side of the head.",
          "benefit": "Stretches the upper Trapezius muscles.",
          "lightSource": require("@/assets/thumbnails/light/ear-to-shoulder.png"),
          "darkSource": require("@/assets/thumbnails/dark/ear-to-shoulder.png")
        },
        {
          "id": 3,
          "name": "Armpit Sniff",
          "description": "Turn head right, look down at your armpit. Gently pull head down with right hand. (Levator Scapula)",
          "benefit": "Relieves pain at the base of the neck/shoulder blade.",
          "lightSource": require("@/assets/thumbnails/light/armpit-sniff.png"),
          "darkSource": require("@/assets/thumbnails/dark/armpit-sniff.png")
        },
        {
          "id": 4,
          "name": "Neck Rotation",
          "description": "Keep torso still, slowly turn head to look over the right shoulder, then the left.",
          "benefit": "Maintains neck range of motion.",
          "lightSource": require("@/assets/thumbnails/light/neck-rotation.png"),
          "darkSource": require("@/assets/thumbnails/dark/neck-rotation.png")
        },
        {
          "id": 5,
          "name": "Half Circles",
          "description": "Drop chin to chest. Roll head gently from right shoulder to left shoulder in a half-moon shape.",
          "benefit": "Relaxes neck vertebrae.",
          "lightSource": require("@/assets/thumbnails/light/half-circles.png"),
          "darkSource": require("@/assets/thumbnails/dark/half-circles.png")
        },
        {
          "id": 6,
          "name": "Isometric Push",
          "description": "Place hand on forehead. Push head forward against hand, but offer resistance so nothing moves. (Front)",
          "benefit": "Strengthens deep neck flexors.",
          "lightSource": require("@/assets/thumbnails/light/isometric-push.png"),
          "darkSource": require("@/assets/thumbnails/dark/isometric-push.png")
        },
        {
          "id": 7,
          "name": "Isometric Push",
          "description": "Place hand on temple. Push head sideways against hand, resisting the movement. (Side)",
          "benefit": "Strengthens lateral neck muscles.",
          "lightSource": require("@/assets/thumbnails/light/isometric-push.png"),
          "darkSource": require("@/assets/thumbnails/dark/isometric-push.png")
        },
        {
          "id": 8,
          "name": "Ceiling Look",
          "description": "Anchor skin on chest with hands, tilt head back to look at ceiling, open and close mouth slightly.",
          "benefit": "Stretches the Platysma and front neck muscles.",
          "lightSource": require("@/assets/thumbnails/light/ceiling-look.png"),
          "darkSource": require("@/assets/thumbnails/dark/ceiling-look.png")
        },
        {
          "id": 9,
          "name": "Shoulder Shrugs",
          "description": "Lift shoulders up to ears, hold for 3 seconds, and drop them suddenly.",
          "benefit": "Releases stress-induced tension.",
          "lightSource": require("@/assets/thumbnails/light/shoulder-shrugs.png"),
          "darkSource": require("@/assets/thumbnails/dark/shoulder-shrugs.png")
        },
        {
          "id": 10,
          "name": "Towel Support",
          "description": "Place a rolled towel behind your neck while seated and lean head back over it.",
          "benefit": "Supports natural cervical lordosis.",
          "lightSource": require("@/assets/thumbnails/light/towel-support.png"),
          "darkSource": require("@/assets/thumbnails/dark/towel-support.png")
        }
      ]
    }, {
      "id": "shoulder_back",
      "category_name": "Back",
      "category_icon_name": 'human-greeting-variant',
      "target_area": "Hunchback (Kyphosis) & Posture",
      "exercises": [
        {
          "id": 1,
          "name": "Wall Angels",
          "description": "Stand against a wall. Arms in 'L' shape touching wall. Slide arms up and down without losing contact.",
          "benefit": "One of the best exercises for posture correction.",
          "lightSource": require("@/assets/thumbnails/light/wall-angels.png"),
          "darkSource": require("@/assets/thumbnails/dark/wall-angels.png")
        },
        {
          "id": 2,
          "name": "Doorway Stretch",
          "description": "Place forearms on a doorframe and lean your body forward through the opening.",
          "benefit": "Opens the chest (Pectorals) and combats slouching.",
          "lightSource": require("@/assets/thumbnails/light/doorway-stretch.png"),
          "darkSource": require("@/assets/thumbnails/dark/doorway-stretch.png")
        },
        {
          "id": 3,
          "name": "Eagle Arms",
          "description": "Wrap arms in front of you, palms touching. Lift elbows to chin height.",
          "benefit": "Deeply opens the upper back (Rhomboids).",
          "lightSource": require("@/assets/thumbnails/light/eagle-arms.png"),
          "darkSource": require("@/assets/thumbnails/dark/eagle-arms.png")
        },
        {
          "id": 4,
          "name": "Scapular Squeeze",
          "description": "While seated, pull elbows back and squeeze shoulder blades together as if holding a pencil.",
          "benefit": "Activates and strengthens back muscles.",
          "lightSource": require("@/assets/thumbnails/light/scapular-squeeze.png"),
          "darkSource": require("@/assets/thumbnails/dark/scapular-squeeze.png")
        },
        {
          "id": 5,
          "name": "Chair Back Extension",
          "description": "Hold the back of your chair. Push chest forward and upward.",
          "benefit": "Stretches anterior deltoids and chest.",
          "lightSource": require("@/assets/thumbnails/light/chair-back-extension.png"),
          "darkSource": require("@/assets/thumbnails/dark/chair-back-extension.png")
        },
        {
          "id": 6,
          "name": "Seated Cat-Cow",
          "description": "Hands on knees. Inhale, arch back (Cow). Exhale, round back and look at belly (Cat).",
          "benefit": "Increases spinal flexibility.",
          "lightSource": require("@/assets/thumbnails/light/seated-cat-cow.png"),
          "darkSource": require("@/assets/thumbnails/dark/seated-cat-cow.png")
        },
        {
          "id": 7,
          "name": "Y-Raise",
          "description": "Raise arms to form a 'Y' shape, pushing thumbs backwards.",
          "benefit": "Targets the lower Trapezius muscles.",
          "lightSource": require("@/assets/thumbnails/light/y-raise.png"),
          "darkSource": require("@/assets/thumbnails/dark/y-raise.png")
        },
        {
          "id": 8,
          "name": "Overhead Tricep Stretch",
          "description": "Hand on neck/upper back, pull elbow gently to the opposite side.",
          "benefit": "Stretches Triceps and Lats.",
          "lightSource": require("@/assets/thumbnails/light/overhead-tricep-stretch.png"),
          "darkSource": require("@/assets/thumbnails/dark/overhead-tricep-stretch.png")
        },
        {
          "id": 9,
          "name": "Seated Thoracic Twist",
          "description": "Right hand on left knee, left hand on chair back. Twist torso to look behind.",
          "benefit": "Provides thoracic spine rotation.",
          "lightSource": require("@/assets/thumbnails/light/seated-thoracic-twist.png"),
          "darkSource": require("@/assets/thumbnails/dark/seated-thoracic-twist.png")
        },
        {
          "id": 10,
          "name": "Self Hug",
          "description": "Wrap arms tightly around yourself, trying to touch shoulder blades. Round your back.",
          "benefit": "Lengthens back muscles.",
          "lightSource": require("@/assets/thumbnails/light/self-hug.png"),
          "darkSource": require("@/assets/thumbnails/dark/self-hug.png")
        }
      ]
    },
    {
      "id": "waist_hip_leg",
      "category_name": "Lower Body",
      "category_icon_name": 'foot-print',
      "target_area": "Lower Back Pain & Circulation",
      "exercises": [
        {
          "id": 1,
          "name": "Figure 4 Stretch",
          "description": "Seated, place right ankle on left knee. Keep back straight and lean forward slightly. (Piriformis)",
          "benefit": "Relieves sciatica and deep hip tightness.",
          "lightSource": require("@/assets/thumbnails/light/figure-4-stretch.png"),
          "darkSource": require("@/assets/thumbnails/dark/figure-4-stretch.png")
        },
        {
          "id": 2,
          "name": "Standing Lunge",
          "description": "Step one foot forward, drop back knee towards ground. Push hips forward.",
          "benefit": "Lengthens hip flexors shortened by sitting.",
          "lightSource": require("@/assets/thumbnails/light/standing-lunge.png"),
          "darkSource": require("@/assets/thumbnails/dark/standing-lunge.png")
        },
        {
          "id": 3,
          "name": "Standing Hamstring Stretch",
          "description": "Place heel on ground, leg straight. Hinge at hips to lean forward (keep back straight).",
          "benefit": "Lengthens hamstrings, relieving pull on lower back.",
          "lightSource": require("@/assets/thumbnails/light/standing-hamstring-stretch.png"),
          "darkSource": require("@/assets/thumbnails/dark/standing-hamstring-stretch.png")
        },
        {
          "id": 4,
          "name": "Knee to Chest",
          "description": "Hug one knee with both hands and pull it towards your chest.",
          "benefit": "Stretches glutes and lower back.",
          "lightSource": require("@/assets/thumbnails/light/knee-to-chest.png"),
          "darkSource": require("@/assets/thumbnails/dark/knee-to-chest.png")
        },
        {
          "id": 5,
          "name": "Seated Pelvic Tilt",
          "description": "Arch your lower back, then flatten it against the chair. Isolate the hip movement.",
          "benefit": "Mobilizes lumbar vertebrae.",
          "lightSource": require("@/assets/thumbnails/light/seated-pelvic-tilt.png"),
          "darkSource": require("@/assets/thumbnails/dark/seated-pelvic-tilt.png")
        },
        {
          "id": 6,
          "name": "Seated Side Bend",
          "description": "Raise one arm, hold chair with other. Lean to the side.",
          "benefit": "Stretches the Quadratus Lumborum (side lower back).",
          "lightSource": require("@/assets/thumbnails/light/seated-side-bend.png"),
          "darkSource": require("@/assets/thumbnails/dark/seated-side-bend.png")
        },
        {
          "id": 7,
          "name": "Ragdoll Fold",
          "description": "Stand up, bend knees slightly, and let your torso hang completely heavy.",
          "benefit": "Decompresses the entire spine.",
          "lightSource": require("@/assets/thumbnails/light/ragdoll-fold.png"),
          "darkSource": require("@/assets/thumbnails/dark/ragdoll-fold.png")
        },
        {
          "id": 8,
          "name": "Nerve Glide",
          "description": "Seated, extend leg straight. Pull toes toward you (flex), then point them away. (Leg Swing)",
          "benefit": "Mobilizes the sciatic nerve.",
          "lightSource": require("@/assets/thumbnails/light/nerve-glide.png"),
          "darkSource": require("@/assets/thumbnails/dark/nerve-glide.png")
        },
        {
          "id": 9,
          "name": "Seated Butterfly",
          "description": "Sit on edge of chair, open legs wide. Push knees outward with hands.",
          "benefit": "Stretches inner thigh (Adductor) muscles.",
          "lightSource": require("@/assets/thumbnails/light/seated-butterfly.png"),
          "darkSource": require("@/assets/thumbnails/dark/seated-butterfly.png")
        },
        {
          "id": 10,
          "name": "Desk Squats",
          "description": "Stand up and sit down without using hands. Repeat 3-4 times.",
          "benefit": "Pumps blood from legs to the heart.",
          "lightSource": require("@/assets/thumbnails/light/desk-squats.png"),
          "darkSource": require("@/assets/thumbnails/dark/desk-squats.png")
        }
      ]
    }
  ]
}
export default exercises