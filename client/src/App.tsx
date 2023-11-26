import React, { useEffect } from 'react';
import { Footer } from './components/Footer';
import { NavBar } from './components/NavBar';
import { SideCollection } from './components/SideCollection';
import { MainCollection } from './pages/MainCollection';
import './styles/global/clean.scss';
import './styles/global/fonts.scss';
import './styles/global/App.scss';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MovieList } from './pages/MovieList';
import { MovieItem } from './pages/MovieItem';
import ActorList from './pages/ActorList';
import CastList from './pages/CastList';
import ActorPage from './pages/ActorPage';
import { UserProfile } from './pages/UserProfile';
function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <NavBar />
        <div className="page">
          <Routes>
            <Route path="movie-list">
              <Route path=":id" element={<MovieList />} />
            </Route>
            <Route path="movie-item">
              <Route path=":id" element={<MovieItem />} />
            </Route>
            <Route path="/actors" element={<ActorList />} />
            <Route path="/collection" element={<MainCollection />} />
            <Route path="/home" element={<UserProfile />} />
            <Route path="/cast-list" element={<CastList />} />
            <Route path="/actor-item/:id" element={<ActorPage />} />
            <Route path="*" element={<Navigate to="/collection" replace />} />
          </Routes>
          <SideCollection />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
