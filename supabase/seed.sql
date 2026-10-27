-- Unibotics Phase 1 Seed Data
-- Workshops and initial draft template

insert into workshops (slug, title, days, audience, topics, outcomes, description, active)
values
  (
    'robotics-and-drones-accelerator',
    'Robotics & Autonomous Drones Bootcamp',
    5,
    array['engineering', 'diploma'],
    array['Robotic Kinematics', 'Microcontroller Telemetry', 'Drone Avionics', 'Autonomous Flight'],
    'Build and program a working 4-rotor drone and autonomous wheeled mobile robot.',
    'An intensive 5-day hands-on engineering workshop combining hardware assembly, sensor fusion, and autonomous logic.',
    true
  ),
  (
    'industrial-iot-embedded-systems',
    'Industrial IoT & Embedded Systems',
    2,
    array['school', 'iti', 'diploma', 'engineering'],
    array['ESP32 Architecture', 'Sensor Interfacing', 'MQTT Cloud Messaging', 'Industrial Telemetry'],
    'Interface industrial environmental sensors with cloud telemetry dashboards in real time.',
    'A high-density 2-day hands-on introduction to microcontrollers, network protocols, and real-time data streaming.',
    true
  ),
  (
    'atal-tinkering-mastery',
    'ATL Innovation & Tinkering Masterclass',
    7,
    array['school'],
    array['Design Thinking', '3D Printing & CAD', 'Arduino Basics', 'Robotics Kits', 'Rapid Prototyping'],
    'Equip school students and teachers with complete mastery over Atal Tinkering Lab equipment and projects.',
    'Comprehensive 7-day school innovation bootcamp covering 3D design, digital fabrication, and electronics prototyping.',
    true
  )
on conflict (slug) do nothing;

insert into certificate_templates (name, layout, signatory_name, signatory_title, active)
values (
  'Default Institutional Certificate Template (Draft)',
  '{"margins": 36, "orientation": "landscape", "border": "double"}'::jsonb,
  'Authorized Signatory [Pending Client Approval]',
  'Director of Technical Programs',
  true
)
on conflict do nothing;
