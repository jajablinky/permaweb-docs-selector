(function() {
  'use strict';
  
  // ========================================
  // CONFIGURATION CONSTANTS
  // ========================================
  
  // Documentation site URLs - update these to your actual documentation URLs
  const DOCUMENTATION_LINKS = {
    AO: "https://cookbook_ao.arweave.net/welcome/index.html",
    HYPERBEAM: "https://hyperbeam.arweave.net/build/introduction/what-is-hyperbeam.html",
    ARWEAVE: "https://cookbook.arweave.net/getting-started/index.html",
  };
  
  // Predefined color schemes
  const THEME_COLORS = {
    light: {
      text: "#333",
      background: "white",
      grey: "#999"
    },
    dark: {
      text: "#e5e5e5",
      background: "black",
      grey: "#666"
    }
  };
  
  // Auto-detect current site based on URL
  function detectCurrentSite() {
    const hostname = window.location.hostname.toLowerCase();
    const href = window.location.href.toLowerCase();
    
    // Check hostname patterns
    if (hostname.includes('cookbook_ao') || hostname.includes('ao.')) {
      return 'AO';
    }
    if (hostname.includes('hyperbeam')) {
      return 'HYPERBEAM';
    }
    if (hostname.includes('cookbook') || hostname.includes('arweave')) {
      return 'ARWEAVE';
    }
    
    // Check URL path patterns
    if (href.includes('/ao/') || href.includes('cookbook_ao')) {
      return 'AO';
    }
    if (href.includes('/hyperbeam/') || href.includes('hyperbeam')) {
      return 'HYPERBEAM';
    }
    if (href.includes('/cookbook/') || href.includes('arweave')) {
      return 'ARWEAVE';
    }
    
    // Default fallback
    return 'ARWEAVE';
  }
  
  // Configuration object that can be overridden at runtime
  window.DocSelectorConfig = window.DocSelectorConfig || {
    currentCookbook: detectCurrentSite(),
    links: DOCUMENTATION_LINKS,
    theme: "auto" // "auto", "light", or "dark"
  };

  // Ensure theme is a valid string
  if (!window.DocSelectorConfig.theme || typeof window.DocSelectorConfig.theme !== 'string') {
    window.DocSelectorConfig.theme = "auto";
  }

  // Validate theme value
  const validThemes = ["auto", "light", "dark"];
  if (!validThemes.includes(window.DocSelectorConfig.theme)) {
    console.warn(`DocSelector: Invalid theme "${window.DocSelectorConfig.theme}", falling back to "auto"`);
    window.DocSelectorConfig.theme = "auto";
  }
  
  // SVG layer definitions
  const bottomLayer = `
    <path d="M75.749 31.3628L38.5 52.8696L1.25 31.3628L38.5 9.85596L75.749 31.3628Z" fill="black" stroke="white" stroke-width="0.25"/>
    <path d="M75.875 22.7754V31.1465L38.625 9.63965V1.26855L75.875 22.7754Z" fill="black" stroke="white" stroke-width="0.25" stroke-linejoin="round"/>
    <path d="M38.3751 9.63965L1.12506 31.1465V22.7754L38.3751 1.26855V9.63965Z" fill="black" stroke="white" stroke-width="0.25" stroke-linejoin="round"/>
    <path opacity="0.9" d="M1 22.7031L38.5 44.3538V53.014L1 31.3634V22.7031Z" fill="black" stroke="white" stroke-width="0.25" stroke-linejoin="round"/>
    <path opacity="0.9" d="M38.5 44.3538L76 22.7031V31.3634L38.5 53.014V44.3538Z" fill="black" stroke="white" stroke-width="0.25" stroke-linejoin="round"/>
    <rect width="43.3013" height="43.3013" transform="matrix(0.866025 0.5 -0.866025 0.5 38.5 1.05273)" fill="black" fill-opacity="0.9" stroke="white" stroke-width="0.25"/>
  `;

  const selectedBottomLayer = `
    <path d="M75.749 31.3628L38.5 52.8696L1.25 31.3628L38.5 9.85596L75.749 31.3628Z" fill="black" stroke="white" stroke-width="0.25" />
    <path d="M75.875 22.7754V31.1465L38.625 9.63965V1.26855L75.875 22.7754Z" fill="black" stroke="white" stroke-width="0.25" stroke-linejoin="round" />
    <path d="M38.3751 9.63965L1.12506 31.1465V22.7754L38.3751 1.26855V9.63965Z" fill="black" stroke="white" stroke-width="0.25" stroke-linejoin="round" />
    <path opacity="0.9" d="M1 22.7031L38.5 44.3538V53.014L1 31.3634V22.7031Z" fill="black" stroke="white" stroke-width="0.25" stroke-linejoin="round" />
    <path opacity="0.9" d="M38.5 44.3538L76 22.7031V31.3634L38.5 53.014V44.3538Z" fill="black" stroke="white" stroke-width="0.25" stroke-linejoin="round" />
    <rect width="43.3013" height="43.3013" transform="matrix(0.866025 0.5 -0.866025 0.5 38.5 1.05273)" fill="black" fill-opacity="0.9" stroke="white" stroke-width="0.25" />
    <rect x="0.194856" y="0.3375" width="4.09545" height="4.09545" transform="matrix(0.866025 0.5 0 1 32.8443 42.9934)" stroke="#FF6A13" stroke-width="0.45" />
    <rect width="1.81818" height="1.81818" transform="matrix(-1.89276e-08 1 -0.866025 -0.5 35.5737 46.0454)" fill="#FF6A13" />
  `;

  const middleLayer = `
    <path d="M75.749 30.7031L38.5 52.21L1.25 30.7031L38.5 9.19629L75.749 30.7031Z" fill="#CACACA" stroke="black" stroke-width="0.25" />
    <path d="M75.875 22.1152V30.4863L38.625 8.97949V0.608398L75.875 22.1152Z" fill="#CACACA" stroke="black" stroke-width="0.25" stroke-linejoin="round" />
    <path d="M38.3751 8.97949L1.12506 30.4863V22.1152L38.3751 0.608398V8.97949Z" fill="#CACACA" stroke="black" stroke-width="0.25" stroke-linejoin="round" />
    <path opacity="0.9" d="M1 22.0435L38.5 43.6941V52.3543L1 30.7037V22.0435Z" fill="#CACACA" stroke="black" stroke-width="0.25" stroke-linejoin="round" />
    <path opacity="0.9" d="M38.5 43.6941L76 22.0435V30.7037L38.5 52.3543V43.6941Z" fill="#CACACA" stroke="black" stroke-width="0.25" stroke-linejoin="round" />
    <rect width="43.3013" height="43.3013" transform="matrix(0.866025 0.5 -0.866025 0.5 38.5 0.392578)" fill="#CACACA" fill-opacity="0.9" stroke="black" stroke-width="0.25" />
  `;

  const selectedMiddleLayer = `
    <path d="M75.749 30.7031L38.5 52.21L1.25 30.7031L38.5 9.19629L75.749 30.7031Z" fill="#CACACA" stroke="black" stroke-width="0.25"/>
    <path d="M75.875 22.1152V30.4863L38.625 8.97949V0.608398L75.875 22.1152Z" fill="#CACACA" stroke="black" stroke-width="0.25" stroke-linejoin="round"/>
    <path d="M38.3751 8.97949L1.12506 30.4863V22.1152L38.3751 0.608398V8.97949Z" fill="#CACACA" stroke="black" stroke-width="0.25" stroke-linejoin="round"/>
    <path opacity="0.9" d="M1 22.0435L38.5 43.6941V52.3543L1 30.7037V22.0435Z" fill="#CACACA" stroke="black" stroke-width="0.25" stroke-linejoin="round"/>
    <path opacity="0.9" d="M38.5 43.6941L76 22.0435V30.7037L38.5 52.3543V43.6941Z" fill="#CACACA" stroke="black" stroke-width="0.25" stroke-linejoin="round"/>
    <rect width="43.3013" height="43.3013" transform="matrix(0.866025 0.5 -0.866025 0.5 38.5 0.392578)" fill="#CACACA" fill-opacity="0.9" stroke="black" stroke-width="0.25"/>
    <rect x="0.194856" y="0.3375" width="4.09545" height="4.09545" transform="matrix(0.866025 0.5 0 1 31.7079 42.948)" fill="transparent" stroke="#FF6A13" stroke-width="0.45"/>
    <rect width="1.81818" height="1.81818" transform="matrix(-1.89276e-08 1 -0.866025 -0.5 34.4374 46)" fill="#FF6A13"/>
  `;

  const topLayer = `
    <path d="M75.749 31.311L38.5 52.8179L1.25 31.311L38.5 9.8042L75.749 31.311Z" fill="white" stroke="black" stroke-width="0.25" />
    <path d="M75.875 22.7227V31.0938L38.625 9.58691V1.21582L75.875 22.7227Z" fill="white" stroke="black" stroke-width="0.25" stroke-linejoin="round" />
    <path d="M38.3751 9.58691L1.12506 31.0938V22.7227L38.3751 1.21582V9.58691Z" fill="white" stroke="black" stroke-width="0.25" stroke-linejoin="round" />
    <path opacity="0.9" d="M1 22.6504L38.5 44.301V52.9613L1 31.3106V22.6504Z" fill="white" stroke="black" stroke-width="0.25" stroke-linejoin="round" />
    <path opacity="0.9" d="M38.5 44.301L76 22.6504V31.3106L38.5 52.9613V44.301Z" fill="white" stroke="black" stroke-width="0.25" stroke-linejoin="round" />
    <rect width="43.3013" height="43.3013" transform="matrix(0.866025 0.5 -0.866025 0.5 38.5 1)" fill="white" fill-opacity="0.9" stroke="black" stroke-width="0.25" />
  `;

  const selectedTopLayer = `
    <path d="M75.749 31.311L38.5 52.8179L1.25 31.311L38.5 9.8042L75.749 31.311Z" fill="white" stroke="black" stroke-width="0.25"/>
    <path d="M75.875 22.7227V31.0938L38.625 9.58691V1.21582L75.875 22.7227Z" fill="white" stroke="black" stroke-width="0.25" stroke-linejoin="round"/>
    <path d="M38.3751 9.58691L1.12506 31.0938V22.7227L38.3751 1.21582V9.58691Z" fill="white" stroke="black" stroke-width="0.25" stroke-linejoin="round"/>
    <path opacity="0.9" d="M1 22.6504L38.5 44.301V52.9613L1 31.3106V22.6504Z" fill="white" stroke="black" stroke-width="0.25" stroke-linejoin="round"/>
    <rect x="0.194856" y="0.3375" width="4.09545" height="4.09545" transform="matrix(0.866025 0.5 0 1 31.7079 42.948)" fill="transparent" stroke="#FF6A13" stroke-width="0.45"/>
    <rect width="1.81818" height="1.81818" transform="matrix(-1.89276e-08 1 -0.866025 -0.5 34.4374 46)" fill="#FF6A13"/>
    <path opacity="0.9" d="M38.5 44.301L76 22.6504V31.3106L38.5 52.9613V44.301Z" fill="white" stroke="black" stroke-width="0.25" stroke-linejoin="round"/>
    <rect width="43.3013" height="43.3013" transform="matrix(0.866025 0.5 -0.866025 0.5 38.5 1)" fill="white" fill-opacity="0.9" stroke="black" stroke-width="0.25"/>
  `;

  function initDocSelector() {
    const { currentCookbook, links } = window.DocSelectorConfig;
    
    let isDark = false;
    let topLabel, middleLabel, bottomLabel, docText, innerWhiteSquare;
    let activeLayer = null;
    let isExpanded = false;
    let mouseMoveHandler = null;
    let svgContainer = null;

    function onThemeChange(cb) {
      const { theme } = window.DocSelectorConfig;
      
      function determineIsDark() {
        try {
          if (theme === "dark") return true;
          if (theme === "light") return false;
          // Auto mode - detect from document element
          return document.documentElement.classList.contains("dark");
        } catch (error) {
          console.warn("DocSelector: Error determining theme, falling back to light mode", error);
          return false;
        }
      }
      
      // Fire once on start-up
      cb(determineIsDark());
      
      // Only observe DOM changes if in auto mode
      if (theme === "auto") {
        const root = document.documentElement;
        const ob = new MutationObserver(() => cb(determineIsDark()));
        ob.observe(root, { attributes: true, attributeFilter: ["class"] });
        return () => ob.disconnect();
      }
      
      // For manual modes, return a no-op cleanup function
      return () => {};
    }

    // Function to update theme colors
    function updateThemeColors(dark) {
      isDark = dark;
      
      try {
        const { theme } = window.DocSelectorConfig;
        const colors = isDark ? THEME_COLORS.dark : THEME_COLORS.light;
        const textColor = colors.text;
        const backgroundColor = colors.background;
        
        // Update the "Select your documentation" text color
        const docTextSpan = docText.querySelector("span");
        if (docTextSpan) {
          docTextSpan.style.color = textColor;
        }
        
        // Update label colors (lines match text color)
        if (topLabel && topLabel.label) {
          topLabel.label.style.color = textColor;
          topLabel.svg.querySelector("path").setAttribute("stroke", textColor);
        }
        if (middleLabel && middleLabel.label) {
          middleLabel.label.style.color = textColor;
          middleLabel.svg.querySelector("path").setAttribute("stroke", textColor);
        }
        if (bottomLabel && bottomLabel.label) {
          bottomLabel.label.style.color = textColor;
          bottomLabel.svg.querySelector("path").setAttribute("stroke", textColor);
        }
        if (innerWhiteSquare) {
          innerWhiteSquare.style.backgroundColor = backgroundColor;
        }
      } catch (error) {
        console.warn("DocSelector: Error updating theme colors, using fallback colors", error);
        // Fallback to predefined colors
        const fallbackColors = isDark ? THEME_COLORS.dark : THEME_COLORS.light;
        
        const docTextSpan = docText.querySelector("span");
        if (docTextSpan) {
          docTextSpan.style.color = fallbackColors.text;
        }
        
        if (topLabel && topLabel.label) {
          topLabel.label.style.color = fallbackColors.text;
          topLabel.svg.querySelector("path").setAttribute("stroke", fallbackColors.text);
        }
        if (middleLabel && middleLabel.label) {
          middleLabel.label.style.color = fallbackColors.text;
          middleLabel.svg.querySelector("path").setAttribute("stroke", fallbackColors.text);
        }
        if (bottomLabel && bottomLabel.label) {
          bottomLabel.label.style.color = fallbackColors.text;
          bottomLabel.svg.querySelector("path").setAttribute("stroke", fallbackColors.text);
        }
        if (innerWhiteSquare) {
          innerWhiteSquare.style.backgroundColor = fallbackColors.background;
        }
      }
    }

    // Create container for the layered SVG structure
    svgContainer = document.createElement("div");
    svgContainer.style.position = "fixed";
    svgContainer.style.bottom = "15px";
    svgContainer.style.right = "30px";
    svgContainer.style.zIndex = "1000";
    svgContainer.setAttribute("data-doc-selector", "true");

    // Select your documentation text with chevron
    docText = document.createElement("div");
    docText.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; gap: 6px; font-size: 14px; text-align: center; font-family: monospace; font-weight: 400; font-size: 10px;">
        <span>Select your documentation</span>
        <svg width="12" height="7" viewBox="0 0 9 5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.875 1L4.4375 4.125L1 1" stroke="#939393" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    `;
    docText.style.position = "absolute";
    docText.style.top = "-70px";
    docText.style.left = "50%";
    docText.style.transform = "translateX(-50%)";
    docText.style.transition = "opacity 0.15s ease";
    docText.style.opacity = "1";

    // Create a wrapper for the layered SVGs
    const layerWrapper = document.createElement("div");
    layerWrapper.style.position = "relative";
    layerWrapper.style.width = "77px";
    layerWrapper.style.height = "70px";
    layerWrapper.style.transition = "all 0.1s ease";
    layerWrapper.style.zIndex = "1001";

    // Create containers for each layer
    const createLayerContainer = (cookbookName) => {
      const container = document.createElement("div");
      const isCurrent = currentCookbook === cookbookName;

      if (isCurrent) {
        container.style.cursor = "default";
      }

      container.style.position = "absolute";
      container.style.display = "block";
      container.style.width = "100%";
      container.style.height = "100%";
      container.style.top = "0";
      container.style.left = "0";
      container.style.pointerEvents = "none";

      return container;
    };

    const aoContainer = createLayerContainer("AO");
    const hyperbeamContainer = createLayerContainer("HYPERBEAM");
    const arweaveContainer = createLayerContainer("ARWEAVE");

    const createLayerLabel = (text, color, position) => {
      const labelContainer = document.createElement("div");
      labelContainer.style.position = "absolute";
      labelContainer.style.display = "flex";
      labelContainer.style.alignItems = "center";
      labelContainer.style.transition = "all 0.15s ease";
      labelContainer.style.opacity = "0";
      // Make labels always clickable with larger hit area
      labelContainer.style.pointerEvents = "auto";
      labelContainer.style.padding = "10px"; // Increase clickable area
      labelContainer.style.margin = "-10px"; // Offset padding to maintain visual position

      // Create text label
      const label = document.createElement("span");
      label.textContent = text;
      label.style.position = "absolute";
      label.style.fontSize = "12px";
      label.style.fontFamily = "Roboto Mono, monospace";
      label.style.color = "#333";
      label.style.fontWeight = "400";
      label.style.whiteSpace = "nowrap";
      label.style.padding = "2px 0";
      label.style.letterSpacing = "-1%";
      label.style.display = "flex";
      label.style.alignItems = "center";

      // Create connecting line using SVG
      const lineSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      lineSvg.setAttribute("width", "60");
      lineSvg.setAttribute("height", "30");
      lineSvg.setAttribute("viewBox", "0 0 60 30");
      lineSvg.style.position = "absolute";

      let linePath, labelPosition, svgPosition;

      switch (position) {
        case "top-right":
          linePath = "M-3.57628e-07 7H48V0";
          labelPosition = { right: "-18px", top: "-5px" }; // Adjusted for padding
          svgPosition = { right: "-21px", top: "20px" }; // Adjusted for padding
          labelContainer.style.flexDirection = "row";
          break;
        case "left":
          linePath = "M39.5 6H1V0";
          labelPosition = { right: "-42px", top: "-5px" }; // Adjusted for padding
          svgPosition = { right: "-70px", top: "20px" }; // Adjusted for padding
          labelContainer.style.flexDirection = "row";
          break;
        case "bottom-right":
          linePath = "M2.38419e-07 1H49V8";
          labelPosition = { right: "-45px", bottom: "8px" }; // Adjusted for padding
          svgPosition = { right: "-21px", top: "-20px" }; // Adjusted for padding
          labelContainer.style.flexDirection = "row";
          break;
      }

      Object.assign(label.style, labelPosition);

      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", linePath);
      path.setAttribute("stroke", "#666");
      path.setAttribute("stroke-width", "1");
      path.setAttribute("fill", "none");

      lineSvg.appendChild(path);
      Object.assign(lineSvg.style, svgPosition);

      labelContainer.appendChild(label);
      labelContainer.appendChild(lineSvg);

      return { container: labelContainer, svg: lineSvg, label: label };
    };

    // Create labels
    topLabel = createLayerLabel("AO", "#333", "top-right");
    middleLabel = createLayerLabel("HYPERBEAM", "#333", "left");
    bottomLabel = createLayerLabel("ARWEAVE", "#333", "bottom-right");

    // Add click handlers
    topLabel.container.addEventListener("click", () => {
      if (currentCookbook !== "AO") window.location.href = links.AO;
    });
    middleLabel.container.addEventListener("click", () => {
      if (currentCookbook !== "HYPERBEAM") window.location.href = links.HYPERBEAM;
    });
    bottomLabel.container.addEventListener("click", () => {
      if (currentCookbook !== "ARWEAVE") window.location.href = links.ARWEAVE;
    });

    // Set cursor for non-current labels
    if (currentCookbook !== "AO") {
      topLabel.container.style.cursor = "pointer";
    }
    if (currentCookbook !== "HYPERBEAM") {
      middleLabel.container.style.cursor = "pointer";
    }
    if (currentCookbook !== "ARWEAVE") {
      bottomLabel.container.style.cursor = "pointer";
    }

    // Add orange square to current cookbook
    const orangeSquare = document.createElement("div");
    orangeSquare.style.width = "12px";
    orangeSquare.style.height = "12px";
    orangeSquare.style.marginRight = "6px";
    orangeSquare.style.flexShrink = "0";
    orangeSquare.style.position = "relative";
    orangeSquare.style.backgroundColor = "#FF6A13";
    orangeSquare.style.border = "1px solid #FF6A13";

    innerWhiteSquare = document.createElement("div");
    innerWhiteSquare.style.width = "10px";
    innerWhiteSquare.style.height = "10px";
    innerWhiteSquare.style.backgroundColor = "white";
    innerWhiteSquare.style.position = "absolute";
    innerWhiteSquare.style.border = "1px solid #FF6A13";

    const innermostSquare = document.createElement("div");
    innermostSquare.style.width = "4px";
    innermostSquare.style.height = "4px";
    innermostSquare.style.backgroundColor = "#FF6A13";
    innermostSquare.style.position = "absolute";
    innermostSquare.style.top = "2px";
    innermostSquare.style.left = "2px";

    innerWhiteSquare.appendChild(innermostSquare);
    orangeSquare.appendChild(innerWhiteSquare);

    // Add orange square to current cookbook label
    if (currentCookbook === "ARWEAVE") {
      bottomLabel.label.insertBefore(orangeSquare, bottomLabel.label.firstChild);
    } else if (currentCookbook === "HYPERBEAM") {
      middleLabel.label.insertBefore(orangeSquare, middleLabel.label.firstChild);
    } else if (currentCookbook === "AO") {
      topLabel.label.insertBefore(orangeSquare, topLabel.label.firstChild);
    }

    // Position labels
    topLabel.container.style.top = "0px";
    topLabel.container.style.right = "0px";
    middleLabel.container.style.top = "22px";
    middleLabel.container.style.left = "0px";
    bottomLabel.container.style.bottom = "-15px";
    bottomLabel.container.style.right = "-140px";

    // Create SVG layers
    const createSVG = (layer, position) => {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "77");
      svg.setAttribute("height", "70");
      svg.setAttribute("viewBox", "0 0 77 70");
      svg.style.position = "absolute";
      svg.style.left = "0";
      svg.style.transition = "all 0.15s ease";
      svg.innerHTML = layer;
      return svg;
    };

    const bottomSvg = createSVG(
      currentCookbook === "ARWEAVE" ? selectedBottomLayer : bottomLayer,
      "17px"
    );
    bottomSvg.style.top = "17px";

    const middleSvg = createSVG(
      currentCookbook === "HYPERBEAM" ? selectedMiddleLayer : middleLayer,
      "9px"
    );
    middleSvg.style.top = "9px";

    const topSvg = createSVG(
      currentCookbook === "AO" ? selectedTopLayer : topLayer,
      "0px"
    );
    topSvg.style.top = "0px";

    // Add documentation text and layer wrapper
    layerWrapper.appendChild(docText);
    svgContainer.appendChild(layerWrapper);

    // Create hover zone
    const hoverZone = document.createElement("div");
    hoverZone.style.position = "absolute";
    hoverZone.style.width = "150px";
    hoverZone.style.height = "160px";
    hoverZone.style.bottom = "0px";
    hoverZone.style.right = "0px";
    hoverZone.style.background = "transparent";
    hoverZone.style.pointerEvents = "none";
    hoverZone.style.zIndex = "1000";
    svgContainer.appendChild(hoverZone);

    // Expansion logic
    function expandState() {
      if (isExpanded) return;
      isExpanded = true;

      svgContainer.style.right = "70px";
      docText.style.opacity = "0";

      topLabel.container.style.opacity = "1";
      middleLabel.container.style.opacity = "1";
      bottomLabel.container.style.opacity = "1";

      layerWrapper.style.width = "120px";
      layerWrapper.style.height = "90px";

      topSvg.style.transform = "scale(1.4)";
      topSvg.style.top = "-7px";
      middleSvg.style.transform = "scale(1.4)";
      middleSvg.style.top = "15px";
      bottomSvg.style.transform = "scale(1.4)";
      bottomSvg.style.top = "35px";

      topLabel.container.style.top = "-0px";
      topLabel.container.style.right = "0px";
      middleLabel.container.style.top = "22px";
      middleLabel.container.style.left = "-74px";
      bottomLabel.container.style.bottom = "0px";
      bottomLabel.container.style.right = "0px";

      hoverZone.style.width = "300px";
      hoverZone.style.height = "220px";
      hoverZone.style.pointerEvents = "auto";
    }

    function resetHoverState() {
      if (!isExpanded) return;
      isExpanded = false;

      hoverZone.style.width = "150px";
      hoverZone.style.height = "160px";
      hoverZone.style.pointerEvents = "none";

      svgContainer.style.right = "30px";
      docText.style.opacity = "1";

      topLabel.container.style.opacity = "0";
      middleLabel.container.style.opacity = "0";
      bottomLabel.container.style.opacity = "0";

      resetLabelColors();

      layerWrapper.style.width = "77px";
      layerWrapper.style.height = "70px";

      topSvg.style.transform = "scale(1)";
      topSvg.style.top = "0px";
      middleSvg.style.transform = "scale(1)";
      middleSvg.style.top = "9px";
      bottomSvg.style.transform = "scale(1)";
      bottomSvg.style.top = "17px";

      topLabel.container.style.top = "-7px";
      topLabel.container.style.right = "-140px";
      middleLabel.container.style.top = "15px";
      middleLabel.container.style.left = "-140px";
      bottomLabel.container.style.bottom = "-15px";
      bottomLabel.container.style.right = "-140px";

      if (mouseMoveHandler) {
        document.removeEventListener("mousemove", mouseMoveHandler);
        mouseMoveHandler = null;
      }
    }

    // Helper functions for layer highlighting
    function greyOutOtherLabels(activeLayerName) {
      try {
        const { theme } = window.DocSelectorConfig;
        const colors = isDark ? THEME_COLORS.dark : THEME_COLORS.light;
        const greyColor = colors.grey;
        const normalColor = colors.text;

        topLabel.label.style.color = normalColor;
        middleLabel.label.style.color = normalColor;
        bottomLabel.label.style.color = normalColor;
        topLabel.svg.querySelector("path").setAttribute("stroke", normalColor);
        middleLabel.svg.querySelector("path").setAttribute("stroke", normalColor);
        bottomLabel.svg.querySelector("path").setAttribute("stroke", normalColor);

        if (activeLayerName === "AO") {
          middleLabel.label.style.color = greyColor;
          bottomLabel.label.style.color = greyColor;
          middleLabel.svg.querySelector("path").setAttribute("stroke", greyColor);
          bottomLabel.svg.querySelector("path").setAttribute("stroke", greyColor);
        } else if (activeLayerName === "HYPERBEAM") {
          topLabel.label.style.color = greyColor;
          bottomLabel.label.style.color = greyColor;
          topLabel.svg.querySelector("path").setAttribute("stroke", greyColor);
          bottomLabel.svg.querySelector("path").setAttribute("stroke", greyColor);
        } else if (activeLayerName === "ARWEAVE") {
          topLabel.label.style.color = greyColor;
          middleLabel.label.style.color = greyColor;
          topLabel.svg.querySelector("path").setAttribute("stroke", greyColor);
          middleLabel.svg.querySelector("path").setAttribute("stroke", greyColor);
        }
      } catch (error) {
        console.warn("DocSelector: Error in greyOutOtherLabels, using fallback colors", error);
        // Fallback to predefined colors
        const fallbackColors = isDark ? THEME_COLORS.dark : THEME_COLORS.light;
        
        topLabel.label.style.color = fallbackColors.text;
        middleLabel.label.style.color = fallbackColors.text;
        bottomLabel.label.style.color = fallbackColors.text;
        topLabel.svg.querySelector("path").setAttribute("stroke", fallbackColors.text);
        middleLabel.svg.querySelector("path").setAttribute("stroke", fallbackColors.text);
        bottomLabel.svg.querySelector("path").setAttribute("stroke", fallbackColors.text);

        if (activeLayerName === "AO") {
          middleLabel.label.style.color = fallbackColors.grey;
          bottomLabel.label.style.color = fallbackColors.grey;
          middleLabel.svg.querySelector("path").setAttribute("stroke", fallbackColors.grey);
          bottomLabel.svg.querySelector("path").setAttribute("stroke", fallbackColors.grey);
        } else if (activeLayerName === "HYPERBEAM") {
          topLabel.label.style.color = fallbackColors.grey;
          bottomLabel.label.style.color = fallbackColors.grey;
          topLabel.svg.querySelector("path").setAttribute("stroke", fallbackColors.grey);
          bottomLabel.svg.querySelector("path").setAttribute("stroke", fallbackColors.grey);
        } else if (activeLayerName === "ARWEAVE") {
          topLabel.label.style.color = fallbackColors.grey;
          middleLabel.label.style.color = fallbackColors.grey;
          topLabel.svg.querySelector("path").setAttribute("stroke", fallbackColors.grey);
          middleLabel.svg.querySelector("path").setAttribute("stroke", fallbackColors.grey);
        }
      }
    }

    function resetLabelColors() {
      try {
        const { theme } = window.DocSelectorConfig;
        const colors = isDark ? THEME_COLORS.dark : THEME_COLORS.light;
        const normalColor = colors.text;

        topLabel.label.style.color = normalColor;
        middleLabel.label.style.color = normalColor;
        bottomLabel.label.style.color = normalColor;

        topLabel.svg.querySelector("path").setAttribute("stroke", normalColor);
        middleLabel.svg.querySelector("path").setAttribute("stroke", normalColor);
        bottomLabel.svg.querySelector("path").setAttribute("stroke", normalColor);
      } catch (error) {
        console.warn("DocSelector: Error in resetLabelColors, using fallback colors", error);
        // Fallback to predefined colors
        const fallbackColors = isDark ? THEME_COLORS.dark : THEME_COLORS.light;
        
        topLabel.label.style.color = fallbackColors.text;
        middleLabel.label.style.color = fallbackColors.text;
        bottomLabel.label.style.color = fallbackColors.text;

        topLabel.svg.querySelector("path").setAttribute("stroke", fallbackColors.text);
        middleLabel.svg.querySelector("path").setAttribute("stroke", fallbackColors.text);
        bottomLabel.svg.querySelector("path").setAttribute("stroke", fallbackColors.text);
      }
    }

    function setHighlight(layerName) {
      if (layerName === "AO") {
        topSvg.style.opacity = "1";
        middleSvg.style.opacity = "0.3";
        bottomSvg.style.opacity = "0.2";
        activeLayer = "AO";
        layerWrapper.style.cursor = currentCookbook !== "AO" ? "pointer" : "default";
        greyOutOtherLabels("AO");
      } else if (layerName === "HYPERBEAM") {
        topSvg.style.opacity = "0.3";
        middleSvg.style.opacity = "1";
        bottomSvg.style.opacity = "0.2";
        activeLayer = "HYPERBEAM";
        layerWrapper.style.cursor = currentCookbook !== "HYPERBEAM" ? "pointer" : "default";
        greyOutOtherLabels("HYPERBEAM");
      } else if (layerName === "ARWEAVE") {
        topSvg.style.opacity = "0.3";
        middleSvg.style.opacity = "0.3";
        bottomSvg.style.opacity = "1";
        activeLayer = "ARWEAVE";
        layerWrapper.style.cursor = currentCookbook !== "ARWEAVE" ? "pointer" : "default";
        greyOutOtherLabels("ARWEAVE");
      }
    }

    function handleLayerOpacity(event) {
      if (
        topLabel.container.matches(":hover") ||
        middleLabel.container.matches(":hover") ||
        bottomLabel.container.matches(":hover")
      ) {
        return;
      }

      const rect = layerWrapper.getBoundingClientRect();
      const mouseY = event.clientY - rect.top;
      const containerHeight = rect.height;
      const sectionHeight = containerHeight / 3;

      if (mouseY <= sectionHeight) {
        setHighlight("AO");
      } else if (mouseY <= sectionHeight * 2) {
        setHighlight("HYPERBEAM");
      } else {
        setHighlight("ARWEAVE");
      }
    }

    function resetLayerOpacity() {
      topSvg.style.opacity = "1";
      middleSvg.style.opacity = "1";
      bottomSvg.style.opacity = "1";
      layerWrapper.style.cursor = "default";
      activeLayer = null;
      resetLabelColors();
    }

    const handleLabelMouseLeave = (event) => {
      resetLabelColors();
      const moveEvent = new MouseEvent("mousemove", {
        bubbles: true,
        cancelable: true,
        clientX: event.clientX,
        clientY: event.clientY,
      });
      layerWrapper.dispatchEvent(moveEvent);
    };

    // Event listeners
    layerWrapper.addEventListener("mouseenter", expandState);
    hoverZone.addEventListener("mouseenter", expandState);
    hoverZone.addEventListener("mouseleave", resetHoverState);

    mouseMoveHandler = (event) => {
      const bounds = svgContainer.getBoundingClientRect();
      if (
        event.clientX < bounds.left - 2 ||
        event.clientX > bounds.right + 2 ||
        event.clientY < bounds.top - 2 ||
        event.clientY > bounds.bottom + 2
      ) {
        resetHoverState();
      }
    };
    document.addEventListener("mousemove", mouseMoveHandler);

    layerWrapper.addEventListener("click", () => {
      if (!activeLayer || activeLayer === currentCookbook) return;
      const link = links[activeLayer];
      if (link) window.location.href = link;
    });

    // Label event listeners
    topLabel.container.addEventListener("mouseenter", () => setHighlight("AO"));
    middleLabel.container.addEventListener("mouseenter", () => setHighlight("HYPERBEAM"));
    bottomLabel.container.addEventListener("mouseenter", () => setHighlight("ARWEAVE"));

    topLabel.container.addEventListener("mouseleave", handleLabelMouseLeave);
    middleLabel.container.addEventListener("mouseleave", handleLabelMouseLeave);
    bottomLabel.container.addEventListener("mouseleave", handleLabelMouseLeave);

    layerWrapper.addEventListener("mousemove", handleLayerOpacity);
    layerWrapper.addEventListener("mouseleave", resetLayerOpacity);

    // Assemble the component
    arweaveContainer.appendChild(bottomSvg);
    hyperbeamContainer.appendChild(middleSvg);
    aoContainer.appendChild(topSvg);

    layerWrapper.appendChild(topLabel.container);
    layerWrapper.appendChild(middleLabel.container);
    layerWrapper.appendChild(bottomLabel.container);

    layerWrapper.appendChild(arweaveContainer);
    layerWrapper.appendChild(hyperbeamContainer);
    layerWrapper.appendChild(aoContainer);

    // Append to body
    document.body.appendChild(svgContainer);

    // Set up theme observer
    onThemeChange(updateThemeColors);
  }

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDocSelector);
  } else {
    initDocSelector();
  }
})(); 
