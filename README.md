# itatiano.site

A dynamic, YAML-driven resume website that automatically updates from a single configuration file. Maintain your professional resume with minimal effort by editing structured data instead of HTML.

## Features

- **YAML-Based Configuration**: Update your resume by editing `resume.yaml`—no HTML or JavaScript knowledge required
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean interface with smooth animations and professional styling
- **PDF Export**: Generate a print-ready PDF with a single click
- **Fullscreen Mode**: View your resume in fullscreen for presentations or detailed review
- **Zero Dependencies**: Lightweight vanilla JavaScript implementation
- **Static Site**: Deploy anywhere—no backend required

## How It Works

The application uses vanilla JavaScript to fetch and parse `resume.yaml` at runtime. Content is dynamically rendered into the HTML structure, allowing you to maintain your resume by editing only the YAML configuration file.

### Project Structure

```
itatiano.site/
├── index.html          # HTML structure and layout
├── script.js           # YAML parsing and dynamic rendering logic
├── styles.css          # Styling and design system
├── resume.yaml         # Resume data (see this file for structure reference)
└── README.md           # Documentation
```

## Updating Your Resume

1. Open `resume.yaml` in your editor
2. Modify the relevant sections (personal information, experience, skills, etc.)
3. Save the file
4. Reload the page in your browser

For the complete YAML structure reference, see [`resume.yaml`](./resume.yaml) in this repository.

### Current Limitations

**Note**: Currently, the application only supports the sections and structure that already exist in `resume.yaml`. You can modify the content within existing sections (e.g., update text, add items to lists, change dates), but adding new sections or restructuring the YAML schema requires corresponding updates to the rendering logic in `script.js`.

Future updates will enable dynamic section handling, allowing you to add, remove, or reorganize sections in the YAML file without modifying the JavaScript code.

## Deployment

This is a static site and can be hosted on any static hosting service:

## License

This project is open source. Feel free to use, modify, and distribute as needed.

---

**Developed by Itatiano Niquini**
