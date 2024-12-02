// nearby-now-widgets.js

(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const apiKey = window.NearbyNowAPIKey;
    if (!apiKey) {
      console.error('Nearby Now API key not found. Please define window.NearbyNowAPIKey in your script.');
      return;
    }

    const baseUrl = 'http://localhost:3000/nearby-now';

    // Function to make API requests
    const fetchWidgetData = async (endpoint, requestData) => {
      try {
        const response = await fetch(`${baseUrl}/${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestData)
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return await response.text().then(text => htmlEncode(text));
      } catch (error) {
        console.error('Error fetching widget data:', error);
      }
    };

    // Function to HTML encode the response text
    const htmlEncode = (str) => {

      // Create a DOM parser to convert the string into DOM nodes
      const parser = new DOMParser();
      const doc = parser.parseFromString(str, 'text/html');

      // Define the default map element HTML to insert
      const defaultMapHTML = `
          <div class="nn-review-map-cont no-location">
          &nbsp; <!-- /* TODO: Add <img> (FPO) "nomap.jpg" when convenient */ -->
            <?xml version="1.0" encoding="UTF-8"?>
            <svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 416.49 505.64">
              <g id="Layer_1-2" data-name="Layer_1">
                <g id="Location_and_Map_Pin_Icon_Set">
                  <path class="nolo-cross" d="M312.59,74C243.89,5.29,132.5,5.29,63.8,74h0C3.49,134.31-4.87,229.19,43.96,299.12l144.23,206.52,144.23-206.52c48.83-69.93,40.47-164.81-19.84-225.12h0ZM188.19,295.12c-53.17,0-96.27-43.1-96.27-96.27s43.1-96.27,96.27-96.27,96.27,43.1,96.27,96.27-43.1,96.27-96.27,96.27Z"/>
                  <rect class="nolo-cross" x="197.17" y="-67.39" width="37.8" height="589.76" rx="18.9" ry="18.9" transform="translate(202.37 -85.96) rotate(41.02)"/>
                  <rect class="nolo-neg-space" x="163.59" y="-59" width="37.34" height="535.82" rx="18.67" ry="18.67" transform="translate(181.87 -68.33) rotate(41.02)"/>
                </g>
              </g>
            </svg>
          </div>
      `;

      // Loop through each `.nn-review-header`
      doc.querySelectorAll('.nn-review-header').forEach(header => {
        // Check if the `.nn-review-map` element exists
        if (!header.querySelector('.nn-review-map')) {
          // Create a new map container and insert it before the `h3` element
          const newMapElement = document.createElement('div');
          newMapElement.innerHTML = defaultMapHTML;
          const h3Element = header.querySelector('h3');
          if (h3Element) {
            header.insertBefore(newMapElement, h3Element);
          }
        }
      });

      return doc.body.innerHTML.replace(/\t/g, '  ').replace('<br>', '');
    };

    // Function to render widget content in a target element
    const renderWidget = (elementId, content) => {
      const element = document.getElementById(elementId);
      if (element) {
        element.innerHTML = content;
      }
    };

    // Fetch and render recent reviews widget
    const recentReviewsElement = document.getElementById('nn-recent-reviews');
    if (recentReviewsElement) {
      fetchWidgetData('recent-reviews', { apiKey }).then(data => {
        if (data) {
          renderWidget('nn-recent-reviews', data); // Render HTML content
        }
      });
    }

    // Fetch and render testimonials widget
    const testimonialsElement = document.getElementById('nn-testimonials');
    if (testimonialsElement) {
      fetchWidgetData('testimonials', { apiKey }).then(data => {
        if (data) {
          renderWidget('nn-testimonials', data); // Render HTML content
        }
      });
    }

    // Fetch and render photo gallery widget
    const photoGalleryElement = document.getElementById('nn-photo-gallery');
    if (photoGalleryElement) {
      fetchWidgetData('photo-gallery', { apiKey }).then(data => {
        if (data) {
          renderWidget('nn-photo-gallery', data); // Render HTML content
        }
      });
    }

    // Fetch and render Google reviews widget
    const googleReviewsElement = document.getElementById('nn-google-reviews');
    if (googleReviewsElement) {
      fetchWidgetData('google-reviews', { apiKey }).then(data => {
        if (data) {
          renderWidget('nn-google-reviews', data); // Render HTML content
        }
      });
    }
  });
})();
