export const dummyComplaints = [
  {
    id: 'VG-99283',
    title: 'Hazardous Pothole on Oak Street',
    tags: ['Infrastructure', 'Public Works Dept'],
    description: 'Large pothole spanning approximately 3 feet in width located at the intersection of Oak and 5th. It is causing significant traffic delays as cars swerve to avoid it, creating a dangerous environment for cyclists and pedestrians.',
    status: 'IN PROGRESS',
    score: 84,
    date: '2 Days Ago',
    location: 'Oak St & 5th Ave, Metropolitan District',
    upvotes: 242,
    image: 'https://images.unsplash.com/photo-1594818379496-da1e345b0ded?auto=format&fit=crop&w=800&q=80',
    progress: [
      { step: 'Complaint Submitted', date: 'Oct 12, 09:45 AM', note: 'Verified', done: true },
      { step: 'Assigned to Department', date: 'Oct 13, 02:20 PM', note: 'Public Works Div B', done: true },
      { step: 'Inspection Scheduled', date: 'Pending Confirmation', note: '', done: false }
    ],
    userId: 'user1'
  },
  {
    id: 'VG-99284',
    title: 'Broken Streetlight Near Park',
    tags: ['Safety', 'Electrical'],
    description: 'The streetlight outside the main entrance to Central Park has been broken for 3 days, leaving the walkway very dark at night.',
    status: 'RESOLVED',
    score: 65,
    date: '1 Week Ago',
    location: 'Central Park West entrance',
    upvotes: 85,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=800&q=80',
    progress: [
      { step: 'Complaint Submitted', date: 'Oct 01, 10:00 AM', note: 'Verified', done: true },
      { step: 'Assigned', date: 'Oct 02, 11:00 AM', note: 'City Electric', done: true },
      { step: 'Fixed', date: 'Oct 04, 05:00 PM', note: 'Bulb Replaced', done: true }
    ],
    userId: 'user1'
  }
];

export const dummyFeed = [
  ...dummyComplaints,
  {
    id: 'VG-99285',
    title: 'Flooded Pedestrian Crossing',
    tags: ['Infrastructure', 'Water Dept'],
    description: 'The pedestrian crossing at 1st and Main floods every time it rains, forcing people to walk into traffic to cross.',
    status: 'OPEN',
    score: 92,
    date: '5 Hours Ago',
    location: '1st & Main',
    upvotes: 512,
    image: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80',
    progress: [
      { step: 'Complaint Submitted', date: 'Today, 08:00 AM', note: 'Under Review', done: true }
    ],
    userId: 'user2'
  }
];

export const dummyNotifications = [
  {
    id: 1,
    type: 'update',
    title: 'Issue Resolved',
    description: 'Your complaint regarding "Street Light Outage" has been marked as resolved.',
    time: '2 hours ago',
    unread: true
  },
  {
    id: 2,
    type: 'update',
    title: 'Status Update',
    description: 'Report #VG-99283 (Pothole) has been assigned to the Public Works Department.',
    time: '1 day ago',
    unread: true
  },
  {
    id: 3,
    type: 'action',
    title: 'Trending Issue',
    description: 'An issue you upvoted "Water Main Break" is now trending in your district.',
    time: '3 days ago',
    unread: false
  },
  {
    id: 4,
    type: 'archive',
    title: 'Old Report Archived',
    description: 'A report from last year has been moved to the city digital archives.',
    time: '1 month ago',
    unread: false
  }
];
