import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { CarouselPlants } from "./components/carousel-plants/carousel-plants";
import { AboutApp } from "./components/about-app/about-app";
import { Sponsors } from "./components/sponsors/sponsors";
import { ProblemMission } from "./components/problem-mission/problem-mission";
import { AppShowcase } from "./components/app-showcase/app-showcase";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, CarouselPlants, AboutApp, Sponsors, ProblemMission, AppShowcase],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('LandingPage');
}
