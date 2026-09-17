// Mock data for the admin dashboard - to be replaced with real API data later.

export const STATS = [
  { label: "Total Students", value: 128, icon: "🧑‍🎓" },
  { label: "Active Classes", value: 9, icon: "🩰" },
  { label: "Upcoming Events", value: 3, icon: "🎉" },
  { label: "New Messages", value: 7, icon: "✉️" },
];

export const STUDENTS = [
  { id: 1, name: "Ananya Krishnan", batch: "Beginners", joined: "2025-01-12", status: "Active" },
  { id: 2, name: "Meera Suresh", batch: "Advanced", joined: "2024-08-03", status: "Active" },
  { id: 3, name: "Divya Raman", batch: "Arangetram Prep", joined: "2023-11-20", status: "Active" },
  { id: 4, name: "Sharanya Iyer", batch: "Online", joined: "2025-03-05", status: "Inactive" },
  { id: 5, name: "Kavya Nair", batch: "Beginners", joined: "2025-06-18", status: "Active" },
  { id: 6, name: "Lakshmi Priya", batch: "Advanced", joined: "2024-02-11", status: "Active" },
  { id: 7, name: "Ritika Nambiar", batch: "Online", joined: "2025-04-22", status: "Active" },
  { id: 8, name: "Swathi Menon", batch: "Beginners", joined: "2025-07-09", status: "Inactive" },
  { id: 9, name: "Deepa Varma", batch: "Arangetram Prep", joined: "2023-05-30", status: "Active" },
  { id: 10, name: "Nithya Balan", batch: "Advanced", joined: "2024-09-14", status: "Active" },
  { id: 11, name: "Anjali Pillai", batch: "Beginners", joined: "2025-08-01", status: "Active" },
  { id: 12, name: "Gayatri Nair", batch: "Online", joined: "2024-12-19", status: "Inactive" },
];

export const CLASSES = [
  { id: 1, name: "Beginners Batch A", schedule: "Mon, Wed - 5:00 PM", students: 18 },
  { id: 2, name: "Advanced Batch", schedule: "Tue, Thu - 6:30 PM", students: 12 },
  { id: 3, name: "Arangetram Prep", schedule: "Sat - 10:00 AM", students: 6 },
  { id: 4, name: "Online Batch", schedule: "Fri - 7:00 PM", students: 22 },
  { id: 5, name: "Beginners Batch B", schedule: "Tue, Thu - 5:00 PM", students: 16 },
  { id: 6, name: "Kids Batch", schedule: "Sat - 11:30 AM", students: 14 },
  { id: 7, name: "Weekend Intensive", schedule: "Sun - 9:00 AM", students: 10 },
];

export const MESSAGES = [
  { id: 1, from: "Radha Menon", subject: "Enrollment for beginners batch", time: "2h ago" },
  { id: 2, from: "Vikram S", subject: "Arangetram date confirmation", time: "5h ago" },
  { id: 3, from: "Priya Das", subject: "Fee payment query", time: "1d ago" },
  { id: 4, from: "Suresh Kumar", subject: "Costume measurements", time: "1d ago" },
  { id: 5, from: "Anitha Rajan", subject: "Class timing change request", time: "2d ago" },
  { id: 6, from: "Kiran Baby", subject: "Online batch access issue", time: "3d ago" },
];

export const VIDEOS = [
  { id: 1, title: "Arangetram Performance 2025", duration: "12:30", active: true },
  { id: 2, title: "Beginners Batch Showcase", duration: "5:45", active: true },
  { id: 3, title: "Guru Interview", duration: "8:20", active: false },
  { id: 4, title: "Annual Day Highlights", duration: "15:10", active: true },
  { id: 5, title: "Thillana Recital", duration: "6:05", active: false },
];

export const IMAGES = [
  { id: 1, title: "Arangetram Ceremony", category: "Events", active: true },
  { id: 2, title: "Classroom Practice", category: "Classes", active: true },
  { id: 3, title: "Guru with Students", category: "Guru", active: true },
  { id: 4, title: "Costume Details", category: "Gallery", active: false },
  { id: 5, title: "Stage Performance", category: "Events", active: true },
  { id: 6, title: "Ghungroo Close-up", category: "Gallery", active: true },
];
