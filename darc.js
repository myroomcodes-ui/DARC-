/* Center everything in HomeActivity */
.home-activity {
    display: flex;
    flex-direction: column;
    justify-content: center; /* vertical center */
    align-items: center;     /* horizontal center */
    width: 100%;
    height: 100vh;           /* full viewport height */
    gap: 2rem;               /* spacing between children */
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #fff;             /* default color for content */
    background: none;        /* no background */
}

/* Make the WelcomeCard adaptive and centered */
.welcome-card {
    width: clamp(300px, 60%, 800px); /* responsive width */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    padding: 3rem;
    border-radius: 24px;
    background: linear-gradient(145deg, #0d0d0d, #1a1a1a);
    box-shadow: 0 0 40px rgba(0, 255, 200, 0.25),
                inset 0 0 12px rgba(0, 255, 200, 0.1);
    color: var(--darc-neon, #00f9ff);
    font-family: "Orbitron", sans-serif;
    text-align: center;
    animation: welcome-fade 1.2s ease-out forwards;
}

/* Buttons and carousel stay fully centered */
.welcome-btn, .carousel-controls {
    align-self: center;
}

/* Optional: add subtle scaling on hover for the card */
.welcome-card:hover {
    transform: scale(1.02);
    transition: transform 0.3s ease-in-out;
}