export interface WorkshopItem {
  id?: string;
  slug: string;
  title: string;
  days: 2 | 5 | 7;
  audience: Array<"school" | "iti" | "diploma" | "engineering">;
  topics: string[];
  outcomes: string;
  description: string;
  prerequisites: string;
  sampleAgenda: Array<{ day: number; title: string; modules: string[] }>;
  whatInstituteProvides: string[];
}

export const WORKSHOPS_CATALOGUE: WorkshopItem[] = [
  {
    slug: "industrial-iot-embedded-systems",
    title: "Industrial IoT & Embedded Systems",
    days: 2,
    audience: ["school", "iti", "diploma", "engineering"],
    topics: [
      "ESP32 Microcontroller Architecture",
      "Sensor Interfacing & ADC Calibration",
      "MQTT & HTTP Telemetry Protocols",
      "Live Cloud Dashboard Integration",
    ],
    outcomes:
      "Interface industrial environmental sensors with microcontrollers, stream telemetry over local networks, and build a real-time monitoring dashboard.",
    description:
      "A high-density 2-day hands-on workshop focused on microcontrollers, sensory data acquisition, and real-time cloud messaging for campus environmental sensing.",
    prerequisites: "Basic understanding of basic electrical circuits and logic gates. No prior programming required.",
    sampleAgenda: [
      {
        day: 1,
        title: "Microcontroller Architecture & Sensor Acquisition",
        modules: [
          "ESP32 pinouts, GPIO, timers, and ADC characteristics",
          "Interfacing analog and digital sensors (DHT11, Ultrasonic, MQ-2 Gas)",
          "Data filtering, noise reduction, and serial telemetry output",
          "Lab Challenge: Build a standalone threshold alarm station",
        ],
      },
      {
        day: 2,
        title: "Network Telemetry, MQTT & Cloud Visualization",
        modules: [
          "Wi-Fi station and access point mode configurations",
          "Lightweight messaging with MQTT brokers and payload structuring",
          "Building real-time web dashboards with gauges and historical graphs",
          "Capstone Review: Deploy multi-node classroom environmental telemetry",
        ],
      },
    ],
    whatInstituteProvides: [
      "Computer lab with Internet access (1 workstation per 2 students)",
      "Standard 230V power points per workbench",
      "Projector or display screen with HDMI input for technical mentor",
    ],
  },
  {
    slug: "robotics-and-drones-accelerator",
    title: "Robotics & Autonomous Drones Bootcamp",
    days: 5,
    audience: ["engineering", "diploma"],
    topics: [
      "Robotic Kinematics & Differential Drive",
      "Motor Drivers & Optical Encoders",
      "Drone Avionics, ESCs & BLDC Motors",
      "Autonomous Navigation & PID Control",
      "Flight Safety & Regulatory Compliance",
    ],
    outcomes:
      "Assemble, wire, program, and tune both a 4-wheel differential drive rover and a programmable quadcopter with closed-loop stabilization.",
    description:
      "An intensive 5-day bootcamp blending mechanical robotics, motor control theory, flight dynamics, and practical autonomous trajectory execution.",
    prerequisites: "Basic familiarity with C/C++ or Python syntax and fundamental physics (mechanics & electronics).",
    sampleAgenda: [
      {
        day: 1,
        title: "Mobile Robot Chassis & Differential Drive Kinematics",
        modules: [
          "Chassis geometry, weight distribution, and motor torque calculation",
          "H-bridge motor drivers (L298N/TB6612FNG) and PWM speed control",
          "Optical encoders and wheel odometry calculation",
          "Practical: Calibration of forward straight-line trajectory",
        ],
      },
      {
        day: 2,
        title: "Sensor Fusion & Autonomous Obstacle Navigation",
        modules: [
          "Ultrasonic range finding and IR boundary detection",
          "Finite State Machine (FSM) programming for obstacle avoidance",
          "PID controller implementation for precise speed and heading",
          "Practical: Autonomous maze solving and hallway navigation",
        ],
      },
      {
        day: 3,
        title: "Drone Aerodynamics & Avionics Hardware Assembly",
        modules: [
          "Thrust-to-weight ratios, propeller pitch, and motor KV ratings",
          "BLDC motor wiring, Electronic Speed Controllers (ESCs), and BECs",
          "Flight controller hardware, IMU gyro/accelerometer, and magnetometer",
          "Practical: Complete physical assembly and solder inspection of quadcopter",
        ],
      },
      {
        day: 4,
        title: "Flight Controller Configuration & PID Tuning",
        modules: [
          "Radio transmitter pairing, channel calibration, and failsafe modes",
          "Flight controller firmware setup (Betaflight / Mission Planner)",
          "Understanding Rate vs Angle modes and Roll/Pitch/Yaw PID tuning",
          "Practical: Tethered motor testing, vibration dampening, and bench calibration",
        ],
      },
      {
        day: 5,
        title: "Outdoor Test Flights, Autonomous Mission & Certification",
        modules: [
          "Pre-flight safety checklist and emergency disarm protocols",
          "Supervised manual hovering and line-of-sight flight drills",
          "Telemetry logging and post-flight diagnostic review",
          "Institutional Showcase: Multi-team drone flight exhibition & certification",
        ],
      },
    ],
    whatInstituteProvides: [
      "Electronics or robotics lab with min 20 solder stations or workbench area",
      "Open outdoor sports ground or indoor auditorium for flight trials (min 40x40 meters)",
      "Standard fire extinguisher (Class ABC) on standby",
    ],
  },
  {
    slug: "atal-tinkering-mastery",
    title: "ATL Innovation & Tinkering Masterclass",
    days: 7,
    audience: ["school"],
    topics: [
      "Design Thinking & Problem Identification",
      "3D Modeling in Tinkercad / FreeCAD",
      "FDM 3D Printing Operations & Slicing",
      "Arduino Microcontroller Foundations",
      "Robotics Kits Assembly & Programming",
      "Rapid Prototyping Capstone Project",
    ],
    outcomes:
      "Empower students and teachers with complete mastery over ATL tools: design 3D models, operate 3D printers, code sensor networks, and build complete innovation prototypes.",
    description:
      "A 7-day comprehensive tinkering masterclass designed for K-12 schools equipped with Atal Tinkering Labs. Covers ideation, digital fabrication, electronics, and exhibition presentation.",
    prerequisites: "Open to students from Grade 6 through 12. No prior engineering experience required.",
    sampleAgenda: [
      {
        day: 1,
        title: "Tinkering Philosophy & Problem Scoping",
        modules: [
          "Understanding the Atal Innovation Mission (AIM) framework",
          "Identifying local community challenges (agriculture, waste, energy)",
          "Rapid ideation and paper prototyping",
          "Project selection and team formation",
        ],
      },
      {
        day: 2,
        title: "3D CAD Modeling & Digital Design",
        modules: [
          "Introduction to 3D spatial thinking and geometric primitives",
          "Designing mechanical brackets and custom enclosures in Tinkercad",
          "Tolerances, draft angles, and export standards (.STL / .OBJ)",
          "Practical: Design an ergonomic sensor enclosure",
        ],
      },
      {
        day: 3,
        title: "Additive Manufacturing & 3D Printer Operations",
        modules: [
          "FDM printer anatomy: nozzles, hotends, extruders, and heated beds",
          "Slicing parameters: layer height, infill percentage, and support structures",
          "Bed leveling, nozzle priming, and live print troubleshooting",
          "Practical: Slice and print student-designed enclosures",
        ],
      },
      {
        day: 4,
        title: "Electronics & Physical Computing with Arduino",
        modules: [
          "Voltage, current, resistance, and Ohm's Law principles",
          "Breadboard wiring fundamentals and short-circuit prevention",
          "Block-based and C++ Arduino programming",
          "Practical: Multi-sensor weather station with buzzer alarm",
        ],
      },
      {
        day: 5,
        title: "Robotics Chassis Assembly & Mechanical Mechanisms",
        modules: [
          "Gears, pulleys, levers, and torque transfer",
          "Assembling modular robotics kit chassis and motor gearboxes",
          "Line following algorithms and infrared sensor arrays",
          "Practical: Autonomous line tracker speed challenge",
        ],
      },
      {
        day: 6,
        title: "Capstone Prototype Fabrication",
        modules: [
          "Integrating 3D printed parts with electronics and motors",
          "Soldering safety and robust permanent wiring",
          "Testing prototype reliability and edge cases",
          "Practical: Complete build of working community solution prototype",
        ],
      },
      {
        day: 7,
        title: "Science Fair Pitch, Evaluation & Badge Ceremony",
        modules: [
          "Poster design, technical documentation, and project summary writing",
          "Delivering a 3-minute technical pitch to school leadership and parents",
          "Peer review, jury assessment, and feedback loop",
          "Formal distribution of verifiable cryptographic badges and certificates",
        ],
      },
    ],
    whatInstituteProvides: [
      "School Atal Tinkering Lab room or designated STEM lab area",
      "Power connections and Internet connectivity for student laptops",
      "Parent and faculty attendance during the final Day 7 exhibition",
    ],
  },
];
