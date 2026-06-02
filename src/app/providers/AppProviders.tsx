import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Login, Signup, isLoggedIn, getDashboardPath } from '@/features/auth'
import { Contact } from '@/features/contact'
import { ProductDetail } from '@/features/products'
import { Deals } from '@/features/home'
import { CustomerRoute, AdminRoute, SuperAdminRoute } from '@/routes/guards'
import {
  CustomerLayout,
  AdminLayout,
  SuperAdminLayout,
  CustomerDashboard,
  AdminDashboard,
  SuperAdminDashboard,
  AllStores,
  StoreDetails,
  Users as AllUsers,
  PlaceholderPage,
} from '@/features/dashboard'
import { ROUTES } from '@/constants'
import type { Category, CartProduct, User } from '@/types'
import {
  ProductsPage,
  HomePage,
  PublicLayout,
  RoleRedirect,
} from './components/RouteHelpers'

export interface AppRoutesProps {
  totalItems: number
  toggleCart: () => void
  loggedIn: boolean
  user: User | null
  selectedCategory: Category
  setSelectedCategory: (category: Category) => void
  addToCart: (product: CartProduct) => void
  handleLogout: () => void
}

const AppRoutes: React.FC<AppRoutesProps> = ({
  totalItems,
  toggleCart,
  loggedIn,
  user,
  selectedCategory,
  setSelectedCategory,
  addToCart,
  handleLogout,
}) => {
  return (
    <Routes>
      {/* Auth */}
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.SIGNUP} element={<Signup />} />

      {/* Entry redirects */}
      <Route path={ROUTES.HOME} element={<RoleRedirect />} />
      <Route path="/dashboard" element={<RoleRedirect />} />

      {/* Public shop */}
      <Route
        element={
          <PublicLayout
            totalItems={totalItems}
            toggleCart={toggleCart}
            loggedIn={loggedIn}
            user={user}
          />
        }
      >
        <Route
          path="/home"
          element={
            <HomePage
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          }
        />
        <Route
          path={ROUTES.PRODUCTS}
          element={
            <ProductsPage
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              addToCart={addToCart}
            />
          }
        />
        <Route
          path="/products/:category"
          element={
            <ProductsPage
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              addToCart={addToCart}
            />
          }
        />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path={ROUTES.DEALS} element={<Deals />} />
        <Route path={ROUTES.CONTACT} element={<Contact />} />
      </Route>

      {/* Customer area */}
      <Route
        path="/customer"
        element={
          <CustomerRoute>
            <CustomerLayout
              totalItems={totalItems}
              toggleCart={toggleCart}
              handleLogout={handleLogout}
            />
          </CustomerRoute>
        }
      >
        <Route index element={<Navigate to={ROUTES.CUSTOMER_HOME} replace />} />
        <Route
          path="home"
          element={
            <HomePage
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          }
        />
        <Route
          path="products"
          element={
            <ProductsPage
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              addToCart={addToCart}
            />
          }
        />
        <Route
          path="products/:category"
          element={
            <ProductsPage
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              addToCart={addToCart}
            />
          }
        />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="deals" element={<Deals />} />
        <Route path="contact" element={<Contact />} />

        <Route path="dashboard" element={<CustomerDashboard />} />
        <Route path="orders" element={<PlaceholderPage title="My Orders" />} />
        <Route path="wishlist" element={<PlaceholderPage title="My Wishlist" />} />
        <Route path="tracking" element={<PlaceholderPage title="Track Order" />} />
        <Route path="addresses" element={<PlaceholderPage title="Addresses" />} />
        <Route path="payments" element={<PlaceholderPage title="Payment Methods" />} />
        <Route path="notifications" element={<PlaceholderPage title="Notifications" />} />
        <Route path="settings" element={<PlaceholderPage title="Account Settings" />} />
      </Route>

      {/* Admin area */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout handleLogout={handleLogout} />
          </AdminRoute>
        }
      >
        <Route index element={<Navigate to={ROUTES.ADMIN_DASHBOARD} replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="analytics" element={<PlaceholderPage title="Analytics" />} />
        <Route path="reports" element={<PlaceholderPage title="Sales Reports" />} />
        <Route path="products" element={<PlaceholderPage title="Product Management" />} />
        <Route path="products/new" element={<PlaceholderPage title="Add Product" />} />
        <Route path="categories" element={<PlaceholderPage title="Categories" />} />
        <Route path="orders" element={<PlaceholderPage title="Orders" />} />
        <Route path="shipping" element={<PlaceholderPage title="Shipping" />} />
        <Route path="reviews" element={<PlaceholderPage title="Reviews" />} />
        <Route path="messages" element={<PlaceholderPage title="Messages" />} />
        <Route path="customers" element={<PlaceholderPage title="Customers" />} />
        <Route path="settings" element={<PlaceholderPage title="Store Settings" />} />
      </Route>

      {/* Super-admin area */}
      <Route
        path="/super-admin"
        element={
          <SuperAdminRoute>
            <SuperAdminLayout handleLogout={handleLogout} />
          </SuperAdminRoute>
        }
      >
        <Route index element={<Navigate to={ROUTES.SUPER_ADMIN_DASHBOARD} replace />} />
        <Route path="dashboard" element={<SuperAdminDashboard />} />
        <Route path="system" element={<PlaceholderPage title="System Health" />} />
        <Route path="analytics" element={<PlaceholderPage title="Platform Analytics" />} />
        <Route path="reports" element={<PlaceholderPage title="Global Reports" />} />
        <Route path="stores" element={<AllStores />} />
        <Route path="stores/new" element={<PlaceholderPage title="Add Store" />} />
        <Route path="stores/:storeId" element={<StoreDetails />} />
        <Route path="users" element={<AllUsers />} />
        <Route path="admins" element={<AllUsers />} />
        <Route path="admins/new" element={<PlaceholderPage title="Add Admin" />} />
        <Route path="roles" element={<PlaceholderPage title="Roles & Permissions" />} />
        <Route path="products" element={<PlaceholderPage title="All Products" />} />
        <Route path="orders" element={<PlaceholderPage title="All Orders" />} />
        <Route path="transactions" element={<PlaceholderPage title="Transactions" />} />
        <Route path="logistics" element={<PlaceholderPage title="Logistics" />} />
        <Route path="config" element={<PlaceholderPage title="Site Config" />} />
        <Route path="database" element={<PlaceholderPage title="Database" />} />
        <Route path="api" element={<PlaceholderPage title="API Management" />} />
        <Route path="audit" element={<PlaceholderPage title="Audit Logs" />} />
        <Route path="settings" element={<PlaceholderPage title="Global Settings" />} />
      </Route>

      {/* Fallback */}
      <Route
        path="*"
        element={
          isLoggedIn() ? (
            <Navigate to={getDashboardPath()} replace />
          ) : (
            <Navigate to={ROUTES.LOGIN} replace />
          )
        }
      />
    </Routes>
  )
}

export default AppRoutes
