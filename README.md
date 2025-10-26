# CustomerLabs - Segment Management Application

A modern, user-friendly segment management application built with Next.js, TypeScript, and Tailwind CSS. This application allows users to create, save, edit, and manage customer segments with various schema configurations.

## Features

- **Create Segments**: Build custom segments by selecting from predefined user and group schemas
- **Save Segments**: Persist segments to localStorage with webhook integration
- **Edit Segments**: Modify existing segments with pre-filled data
- **Delete Segments**: Remove individual segments or clear all at once
- **Real-time Updates**: Automatically refresh the segment list when changes occur
- **Loading States**: Smooth UX with loading indicators during async operations
- **Responsive Design**: Optimized for mobile, tablet, and desktop views
- **Glass Morphism UI**: Modern, elegant design with glass effect layouts

## 🛠 Core Technologies

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **LocalStorage** for client-side persistence
- **Webhook Integration** for segment saving

## Available Schemas

### User Traits (Green)

- First Name
- Last Name
- Gender
- Age

### Group Traits (Pink)

- Account Name
- City
- State

## Quick Start

### Requirements

- Node.js (LTS version 18 or higher recommended)
- npm, yarn, or pnpm

### Installation

```powershell
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` — Start Next.js dev server with Turbopack
- `npm run build` — Build for production
- `npm run start` — Start the production server
- `npm run lint` — Run ESLint checks

## Project Structure

```
├── app/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page with segment list
│   ├── config.ts            # Page configuration
│   ├── hooks.ts             # Custom React hooks
│   ├── globals.css          # Global styles
│   └── api/
│       └── save-segment/
│           └── route.ts     # API endpoint for saving segments
├── components/
│   ├── segment/
│   │   ├── segment-modal.tsx          # Main modal for create/edit
│   │   ├── saved-segments-list.tsx    # Display saved segments
│   │   ├── schema-list.tsx            # List of schema rows
│   │   ├── schema-row.tsx             # Individual schema selector
│   │   ├── schema-config.tsx          # Schema definitions
│   │   ├── add-schema-button.tsx      # Add new schema row
│   │   ├── legend.tsx                 # Legend for schema types
│   │   └── status-modal.tsx           # Success/error modals
│   ├── layouts/
│   │   └── glass-layout.tsx           # Glass morphism wrapper
│   ├── ui/
│   │   ├── button.tsx                 # Reusable button component
│   │   ├── dialog.tsx                 # Dialog/modal component
│   │   ├── input.tsx                  # Input field component
│   │   ├── select.tsx                 # Select dropdown component
│   │   ├── tooltip.tsx                # Tooltip component
│   │   └── loader.tsx                 # Loading spinner
│   └── sidebar.tsx                    # Sidebar navigation
├── lib/
│   └── utils.ts             # Utility functions (cn, etc.)
└── public/                  # Static assets
```

## How to Use

### Creating a New Segment

1. Click the **"Save Segment"** button
2. Enter a name for your segment
3. Click **"+ Add schema to segment"** to add schema rows
4. Select schemas from the dropdowns (each schema can only be used once)
5. Click **"Save the Segment"** to persist

### Editing a Segment

1. Find the segment in the list
2. Click the **"Edit"** button
3. Modify the name or schemas as needed
4. Click **"Save the Segment"** to update

### Deleting Segments

- **Single**: Click "Delete" on a segment, then confirm
- **All**: Click "Delete All Segments" at the bottom, then confirm

## UI/UX Features

- **Color-coded schemas**: Green dots for user traits, pink for group traits
- **Loading indicators**: Spinner shows during save operations and data loading
- **Validation**: Real-time validation prevents saving incomplete segments
- **Confirmation dialogs**: Prevent accidental data loss
- **Responsive tooltips**: Helpful hints for disabled actions
- **Auto-dismiss notifications**: Success/error messages auto-close after 5 seconds

## Key Components

### SegmentModal

- Handles both create and edit modes
- Loads existing segment data when editing
- Validates form before submission
- Shows loading states during async operations
- Dispatches events to refresh the segment list

### SavedSegmentsList

- Displays all saved segments sorted by timestamp
- Listens for `segments-updated` events
- Provides edit and delete actions
- Shows "No saved segments yet" when empty

### Loader

- Simple, accessible circular loader
- Three sizes: `sm`, `md`, `lg`
- Customizable via className

## API Integration

The application integrates with a webhook endpoint for segment persistence:

**Endpoint**: `/api/save-segment`

**Request Body**:

```json
{
  "segmentName": "My Segment",
  "schemas": ["first_name", "last_name", "city"],
  "timestamp": "2025-10-26T12:00:00.000Z"
}
```

**Response**:

```json
{
  "success": true,
  "response": "Webhook response data..."
}
```

## Data Storage

Segments are stored in browser localStorage under the key `savedSegments`:

```typescript
type SavedSegment = {
  id: string; // Unique timestamp-based ID
  name: string; // Segment name
  schemas: string[]; // Array of schema values
  timestamp?: string; // ISO timestamp
};
```

## Future Enhancements

- Backend persistence instead of localStorage
- Segment filtering and search
- Export segments to CSV/JSON
- Duplicate segment functionality
- Schema grouping and organization
- Segment analytics and usage tracking

## Contributing

This is a demonstration project. Feel free to fork and adapt for your own use.

## License

MIT License - feel free to use this project for your own purposes.

## Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
