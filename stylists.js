const stylistsByLocation = {
  "Boston, MA": [
    {name: "Alex B.", mention: "Excellent reviews for modern men's styles", tags: ["men", "coloring"]},
    {name: "Sara K.", mention: "Known for vibrant coloring work", tags: ["women", "coloring", "waxing"]}
  ],
  "Cambridge, MA": [
    {name: "Jamie L.", mention: "Great with kids and quick cuts", tags: ["men", "women", "kids"]}
  ],
  "Providence, RI": [
    {name: "Morgan P.", mention: "Skilled with beard trims", tags: ["men", "waxing"]}
  ],
  "Hartford, CT": [
    {name: "Taylor R.", mention: "Versatile stylist for all ages", tags: ["men", "women", "kids"]}
  ],
  "Portland, ME": [
    {name: "Casey D.", mention: "Specializes in color and highlights", tags: ["women", "coloring"]}
  ]
};

document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('stylists');

  for (const [location, stylists] of Object.entries(stylistsByLocation)) {
    const locDiv = document.createElement('div');

    const heading = document.createElement('h2');
    heading.textContent = location;
    heading.className = 'text-xl font-semibold mb-2';
    locDiv.appendChild(heading);

    const list = document.createElement('ul');
    list.className = 'space-y-1';
    stylists.forEach(s => {
      const item = document.createElement('li');
      const tags = s.tags.map(tag => `<span class="px-2 py-1 bg-gray-200 rounded text-sm">${tag}</span>`).join(' ');
      item.innerHTML = `<span class="font-medium">${s.name}</span> - ${s.mention}<div class="mt-1">${tags}</div>`;
      list.appendChild(item);
    });
    locDiv.appendChild(list);
    container.appendChild(locDiv);
  }
});
