import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LessonCard = (props) => (
    <div class="card my-3 mx-auto" style={{width: 23 + "rem"}}>
        <img src="#" class="card-img-top" alt="test"></img>
        <div class="card-body">
            <h5>Hello</h5>
            <a href="#"></a>
        </div>
    </div>
);

export default function lessonList() 
{
    const [lessons, setLessons] = useState([]);

    useEffect(() => {
        async function getLessons() {
            const lessons = ["Enigma", "Helix"];
            setLessons(lessons);
        }
      
        getLessons();
      
        return;
      }, [lessons.length]);

    function toTitleCase(str) {
        // Given a string in the format "this-is-a-string", return "This Is A String"
        return str.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
    }
      
    async function lessonList() {
        return (
            <LessonCard />
        );
    }

    // This following section will display the table with the records of individuals.
    return (
        <div>
            <h3>Record List</h3>
            <div class="container">
                {lessonList()}
            </div>
        </div>
    );
}