const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConnection");
const { v4: uuidv4 } = require("uuid");

const PropertyInvestorNote = sequelize.define(
  "PropertyInvestorNote",
  {
    propertyId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    investorId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    notes: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: [],
      validate: {
        isValidNotesArray(value) {
          if (!Array.isArray(value)) {
            throw new Error("notes must be an array");
          }
        },
      },
    },
    totalNotesCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "property_investor_notes",
    // timestamps: true,    // ✅ Inherited from global config
    // underscored: true,   // ✅ Inherited from global config
    // freezeTableName: true, // ✅ Inherited from global config
  }
);

// ============================================
// HELPER METHODS (Static Methods)
// ============================================

/**
 * Add a new note to the notes array
 * @param {Object} noteRecord - The PropertyInvestorNote instance
 * @param {String} noteText - The note content
 * @param {String} investorId - UUID of the investor creating the note
 * @returns {Object} The newly created note
 */
PropertyInvestorNote.addNote = function (noteRecord, noteText, investorId) {
  const newNote = {
    noteId: uuidv4(),
    noteText: noteText,
    createdAt: new Date().toISOString(),
    createdBy: investorId,
  };

  noteRecord.notes = [...noteRecord.notes, newNote];
  noteRecord.totalNotesCount = noteRecord.notes.length;

  return newNote;
};

/**
 * Get a specific note by ID
 * @param {Object} noteRecord - The PropertyInvestorNote instance
 * @param {String} noteId - UUID of the note
 * @returns {Object|null} The note object or null if not found
 */
PropertyInvestorNote.getNoteById = function (noteRecord, noteId) {
  return noteRecord.notes.find((note) => note.noteId === noteId) || null;
};

/**
 * Update a note's text
 * @param {Object} noteRecord - The PropertyInvestorNote instance
 * @param {String} noteId - UUID of the note to update
 * @param {String} newNoteText - New text content
 * @returns {Object|null} Updated note or null if not found
 */
PropertyInvestorNote.updateNote = function (noteRecord, noteId, newNoteText) {
  const noteIndex = noteRecord.notes.findIndex((n) => n.noteId === noteId);

  if (noteIndex === -1) {
    return null;
  }

  noteRecord.notes[noteIndex] = {
    ...noteRecord.notes[noteIndex],
    noteText: newNoteText,
    updatedAt: new Date().toISOString(),
  };

  noteRecord.changed("notes", true);
  return noteRecord.notes[noteIndex];
};

module.exports = PropertyInvestorNote;
