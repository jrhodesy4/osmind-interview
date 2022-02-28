import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { Link } from "react-router-dom";
import { BsPencilSquare } from "react-icons/bs";
import { GrAttachment } from "react-icons/gr";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import { LinkContainer } from "react-router-bootstrap";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./Home.css";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }

      try {
        const notes = await loadNotes();
        console.log('notes', notes);
        setNotes(notes.notes);
      } catch (e) {
        onError(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [isAuthenticated]);

  function loadNotes() {
    return API.get("notes", "/");
  }

  // updates search term and calls the method to filter notes
  const updateSearch = e => {
    console.log(e.target.value);
    setSearchTerm(e.target.value);
    filterNotes(e.target.value);
  };

  // function to take in search term and
  // filter all notes by term
  const filterNotes = term => {

    let tempArr = [];
    for (let i=0; i< notes.length; i++) {
      if (notes[i].content.toLowerCase().includes(term)) {
        tempArr.push(notes[i]);
      }
    }
    if (tempArr.length) {
      setFilteredNotes(tempArr);
    } else {
      setFilteredNotes([]);
    }
  };

  function renderNotesList(notes) {
    let content = searchTerm ? filteredNotes : notes;
    return (
      <> 
        <Form className="d-flex mb-3">
          <Form.Control
            value={searchTerm}
            onChange={updateSearch}
            type="search"
            placeholder="Filter notes"
            className="me-2"
            aria-label="Search"
          />
        </Form>
        <LinkContainer to="/notes/new">
          <ListGroup.Item action className="py-3 text-nowrap text-truncate">
            <BsPencilSquare size={17} />
            <span className="ml-2 font-weight-bold">Create a new note</span>
          </ListGroup.Item>
        </LinkContainer>
        { content.length ? content.map(({ noteId, content, createdAt, attachment }) => (
          <LinkContainer key={noteId} to={`/notes/${noteId}`}>
            <ListGroup.Item action>
              <span className="font-weight-bold">
                {content.trim().split("\n")[0]}
              </span>
              <br />
              <span className="text-muted mr-2">
                Created: {new Date(createdAt).toLocaleString()}
              </span>
              { attachment && <GrAttachment size={17} /> }
            </ListGroup.Item>
          </LinkContainer>
        )) : <h2 className="mt-5 text-center">No notes match your search</h2> }
      </>
    );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>Scratch</h1>
        <p className="text-muted">A simple note taking app</p>
        <div className="pt-3">
          <Link to="/login" className="btn btn-info btn-lg mr-3">
            Login
          </Link>
          <Link to="/signup" className="btn btn-success btn-lg">
            Signup
          </Link>
        </div>
      </div>
    );
  }

  function renderNotes() {
    return (
      <div className="notes">
        <h2 className="pb-3 mt-4 mb-3 border-bottom">Your Notes</h2>
        <ListGroup>{!isLoading && renderNotesList(notes)}</ListGroup>
      </div>
    );
  }
  
  return (
    <div className="Home">
      {isAuthenticated ? renderNotes() : renderLander()}
    </div>
  );
}
