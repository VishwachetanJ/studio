
// src/types/admin-portal.ts

/**
 * Represents a single attendance record for an employee.
 */
export interface AttendanceRecord {
  id: string; // Unique ID for the record
  employeeId: string; // ID of the employee
  date: string; // Date of the record (ISO format, e.g., "2024-07-30")
  checkInTime?: string; // Time of check-in (ISO format or HH:mm:ss)
  checkOutTime?: string; // Time of check-out (ISO format or HH:mm:ss)
  status: "Present" | "Absent" | "Late" | "EarlyLeave" | "OnLeave" | "Holiday";
  source: "Biometric" | "GPS" | "Manual" | "System"; // Source of the attendance data
  notes?: string; // Any notes by HR or system
  verifiedBy?: string; // Employee ID of HR personnel who verified/modified
  lastModified: string; // Timestamp of last modification
}

/**
 * Represents a summary of an employee's performance based on attendance and other metrics.
 */
export interface EmployeePerformanceSummary {
  employeeId: string;
  period: string; // e.g., "July 2024", "Q3 2024"
  punctualityScore: number; // 0-100
  attendancePercentage: number; // 0-100
  overtimeHours?: number;
  absentDays: number;
  lateDays: number;
  overallPerformanceRating?: "Excellent" | "Good" | "Satisfactory" | "NeedsImprovement" | "Poor";
  remarks?: string;
}

/**
 * Represents an employee complaint or issue logged in the system.
 */
export interface ComplaintEntry {
  id: string; // Unique ID for the complaint
  reportedByEmployeeId?: string; // Employee who reported (if applicable)
  subjectEmployeeId?: string; // Employee the complaint is about (if applicable)
  dateReported: string; // Timestamp
  category: "Workplace" | "Harassment" | "AttendanceDiscrepancy" | "Payroll" | "Misconduct" | "Other";
  description: string;
  status: "Open" | "InProgress" | "Resolved" | "Closed" | "Escalated";
  assignedToHrEmployeeId?: string; // HR personnel handling the complaint
  resolutionDetails?: string;
  attachments?: { fileName: string; fileUrl: string }[];
  log: { timestamp: string; action: string; byEmployeeId: string; notes?: string }[]; // Audit log for the complaint
}

/**
 * Represents an employee's leave application.
 */
export interface LeaveApplication {
  id: string;
  employeeId: string;
  leaveType: "Annual" | "Sick" | "Casual" | "Unpaid" | "Maternity" | "Paternity" | "Other";
  startDate: string; // ISO Date
  endDate: string; // ISO Date
  reason: string;
  status: "Pending" | "Approved" | "Rejected" | "Cancelled";
  approvedByEmployeeId?: string;
  applicationDate: string; // ISO Timestamp
  comments?: string;
}

// You can continue to add more interfaces here as the admin portal features expand.
// For example, for user roles and permissions:

export interface UserRole {
  id: string;
  name: "Admin" | "Founder" | "Manager" | "HRAssistant" | "AccountsClerk" | "FieldOfficer"; // Example roles
  permissions: string[]; // e.g., ["view:attendance", "edit:attendance", "approve:leave"]
}

export interface EmployeeProfile {
  employeeId: string;
  fullName: string;
  department: string;
  designation: string;
  roleId: string; // Links to UserRole
  // ... other profile details
}
