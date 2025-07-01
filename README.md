# Pisano Survey Builder

Create dynamic surveys with drag-and-drop functionality, real-time preview, and multiple question types.

## Installation

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone git@github.com:coskuntekin/pisano-survey-builder.git
   cd pisano-survey-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## Usage

### Default Login Credentials
To access the survey builder, use these credentials:
- **Email**: admin@pisano.com
- **Password**: password

## Testing

The project includes comprehensive testing setup:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Coverage
- Unit tests for Redux store and reducers
- Component integration tests
- User interaction testing with @testing-library/user-event
- Accessibility testing compliance

## Build & Deployment

### Development Build
```bash
npm run build
```

### Production Preview
```bash
npm run preview
```
