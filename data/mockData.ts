
import { User, UserRole, TiffinProvider, Order, OrderStatus, Meal } from '../types';

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Anjali Sharma', email: 'customer@test.com', role: UserRole.CUSTOMER, avatar: 'https://picsum.photos/seed/u1/100/100' },
  { id: 'u2', name: 'Rajesh Kumar', email: 'provider@test.com', role: UserRole.PROVIDER, avatar: 'https://picsum.photos/seed/u2/100/100' },
  { id: 'u3', name: 'Admin Tiffin', email: 'admin@test.com', role: UserRole.ADMIN, avatar: 'https://picsum.photos/seed/u3/100/100' },
  { id: 'u4', name: 'Priya Patel', email: 'priya@test.com', role: UserRole.CUSTOMER, avatar: 'https://picsum.photos/seed/u4/100/100' },
];

const meal_dal_makhani: Meal = {id: 'm1', name: 'Dal Makhani', description: 'Creamy black lentils.', type: 'veg'};
const meal_paneer_butter_masala: Meal = {id: 'm2', name: 'Paneer Butter Masala', description: 'Cottage cheese in a rich tomato gravy.', type: 'veg'};
const meal_roti: Meal = {id: 'm3', name: 'Tawa Roti', description: 'Whole wheat flatbread.', type: 'veg'};
const meal_rice: Meal = {id: 'm4', name: 'Jeera Rice', description: 'Cumin flavored rice.', type: 'veg'};
const meal_chicken_curry: Meal = {id: 'm5', name: 'Chicken Curry', description: 'Homestyle chicken curry.', type: 'non-veg'};
const meal_salad: Meal = {id: 'm6', name: 'Green Salad', description: 'Fresh seasonal salad.', type: 'vegan'};

export const MOCK_PROVIDERS: TiffinProvider[] = [
  {
    id: 'p1',
    name: "Rajesh's Kitchen",
    description: 'Authentic North Indian homemade food, delivered fresh to your doorstep. We use only the freshest ingredients.',
    cuisine: 'North Indian',
    rating: 4.8,
    isVerified: true,
    coverImage: 'https://picsum.photos/seed/p1/800/400',
    reviews: [
      { id: 'r1', userId: 'u1', userName: 'Anjali Sharma', rating: 5, comment: 'Absolutely delicious food!', date: '2023-10-25' },
      { id: 'r2', userId: 'u4', userName: 'Priya Patel', rating: 4, comment: 'Good quality and quantity.', date: '2023-10-24' },
    ],
    menu: [
        { day: 'Monday', lunch: [meal_dal_makhani, meal_roti, meal_rice], dinner: [meal_paneer_butter_masala, meal_roti, meal_rice] },
        { day: 'Tuesday', lunch: [{id: 'm7', name: 'Rajma Chawal', description: 'Kidney beans curry with rice.', type: 'veg'}], dinner: [{id: 'm8', name: 'Aloo Gobi', description: 'Potato and cauliflower stir-fry.', type: 'veg'}] },
        { day: 'Wednesday', lunch: [meal_chicken_curry, meal_roti, meal_rice], dinner: [meal_paneer_butter_masala, meal_roti, meal_rice] },
        { day: 'Thursday', lunch: [meal_dal_makhani, meal_roti, meal_rice], dinner: [{id: 'm9', name: 'Bhindi Masala', description: 'Spiced okra.', type: 'veg'}] },
        { day: 'Friday', lunch: [{id: 'm10', name: 'Chole Bhature', description: 'Chickpea curry with fried bread.', type: 'veg'}], dinner: [meal_chicken_curry, meal_roti, meal_rice] },
        { day: 'Saturday', lunch: [meal_paneer_butter_masala, meal_roti, meal_rice], dinner: [{id: 'm11', name: 'Egg Curry', description: 'Boiled eggs in a spicy gravy.', type: 'non-veg'}] },
    ],
    plans: [
      { id: 'plan1', name: 'Monthly Veg Plan', price: 3000, description: 'Lunch and Dinner for 30 days.', type: 'monthly' },
      { id: 'plan2', name: 'Weekly Veg Plan', price: 800, description: 'Lunch and Dinner for 7 days.', type: 'weekly' },
    ],
  },
  {
    id: 'p2',
    name: "Priya's Healthy Bites",
    description: 'Healthy and tasty meals with a focus on fresh, organic ingredients. Perfect for the health-conscious.',
    cuisine: 'Healthy',
    rating: 4.5,
    isVerified: true,
    coverImage: 'https://picsum.photos/seed/p2/800/400',
    reviews: [
      { id: 'r3', userId: 'u1', userName: 'Anjali Sharma', rating: 4, comment: 'Very healthy options.', date: '2023-10-22' },
    ],
    menu: [
        { day: 'Monday', lunch: [{id: 'm12', name: 'Quinoa Salad', description: 'with fresh vegetables.', type: 'vegan'}], dinner: [{id: 'm13', name: 'Grilled Tofu', description: 'with steamed veggies.', type: 'vegan'}]},
        { day: 'Tuesday', lunch: [{id: 'm14', name: 'Lentil Soup', description: 'Hearty and healthy.', type: 'vegan'}], dinner: [{id: 'm15', name: 'Brown Rice Pulao', description: 'with mixed vegetables.', type: 'vegan'}]},
    ],
    plans: [
      { id: 'plan3', name: 'Monthly Health Plan', price: 4000, description: 'Specialized healthy meals.', type: 'monthly' },
    ],
  },
  {
    id: 'p3',
    name: "South Spice",
    description: 'Traditional South Indian meals, full of flavor and spice. From our family kitchen to your table.',
    cuisine: 'South Indian',
    rating: 4.2,
    isVerified: false,
    coverImage: 'https://picsum.photos/seed/p3/800/400',
    reviews: [],
    menu: [
        { day: 'Monday', lunch: [{id: 'm16', name: 'Sambar Rice', description: 'Lentil stew with rice.', type: 'veg'}], dinner: [{id: 'm17', name: 'Idli Sambar', description: 'Steamed rice cakes.', type: 'veg'}] },
    ],
    plans: [
      { id: 'plan4', name: 'Weekly South Special', price: 750, description: 'Authentic South Indian taste.', type: 'weekly' },
    ],
  },
];

export const MOCK_ORDERS: Order[] = [
  { id: 'o1', userId: 'u1', providerId: 'p1', planId: 'plan1', status: OrderStatus.OUT_FOR_DELIVERY, startDate: '2023-10-01', endDate: '2023-10-31', totalAmount: 3000 },
  { id: 'o2', userId: 'u4', providerId: 'p2', planId: 'plan3', status: OrderStatus.DELIVERED, startDate: '2023-09-01', endDate: '2023-09-30', totalAmount: 4000 },
  { id: 'o3', userId: 'u1', providerId: 'p2', planId: 'plan3', status: OrderStatus.CANCELLED, startDate: '2023-10-15', endDate: '2023-11-14', totalAmount: 4000 },
];
