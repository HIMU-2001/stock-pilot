
# 📦 Product Dashboard

A simple and modern web application to **manage products, categories, and inventory** with ease.  
Supports product creation, editing, deletion, filtering, and pagination in a responsive UI.

🔗 **Live Demo**: [https://your-demo-url.com](https://stock-pilot-wine.vercel.app)



## 🚀 Features
- View, search, and filter products by category.
- Add, edit, and delete products with validation.
- Paginated product table with loading skeletons and empty-state design.
- Responsive UI built with modern React stack.



## ⚙️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/HIMU-2001/stock-pilot.git
   cd product-dashboard

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. Open http://localhost:3000 in your browser 🚀


## 📚 Libraries Used

* **Next.js 13+** – App directory structure for modern React apps
* **React Query (@tanstack/react-query)** – Data fetching & caching
* **Tailwind CSS** – Utility-first styling
* **shadcn/ui** – Pre-built accessible UI components
* **Lucide Icons** – Beautiful icons for actions
* **TypeScript** – Type-safe development


## 🧩 Approach

The app is designed with a **modular component-based architecture**:

* **Separation of concerns**: Table, Filters, Pagination, and Dialogs are independent, reusable components.
* **Optimistic UI** with React Query for seamless product add/edit/delete.
* **Debounced search** for better performance on text queries.
* **Error & empty states** handled gracefully with Skeleton loaders and fallback UI.
* **Minimal & modern design** using Tailwind + shadcn/ui for a clean experience.


## 📷 Screenshots 
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/249eaa52-c99c-4c4c-ac03-8859bf29ed9f" />


