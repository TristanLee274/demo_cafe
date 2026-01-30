# CRUD Operations Standard

## Overview
This document defines the standard patterns for API Create, Read, Update, and Delete operations.

## Standards
### HTTP Methods
- **GET**: Retrieve resource(s).
- **POST**: Create a new resource.
- **PUT/PATCH**: Update a resource (PUT for replace, PATCH for partial).
- **DELETE**: Remove a resource.

### Response Format
```json
{
  "data": { ... },
  "meta": { ... } // Pagination etc
}
```
