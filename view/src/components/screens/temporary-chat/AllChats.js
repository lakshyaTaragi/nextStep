import React from 'react';


const AllChats = () => {
    return (

	
		<form action="chat.html">
			<div>
				<label for="username">Username</label>
				<input
					type="text"
					name="username"
					id="username"
					placeholder="Enter username..."
					required
				/>
			</div>
			<div>
				<label for="room">Room</label>
				<select name="room" id="room">
					<option value="JavaScript">JavaScript</option>

				</select>
			</div>
			
            <div class="ui celled list">
                <div class="item">
                    <img class="ui avatar image" src="/images/avatar/small/helen.jpg" />
                    <div class="content">
                    <div class="header">Snickerdoodle</div>
                    An excellent companion
                    </div>
                </div>
                <div class="item">
                    <img class="ui avatar image" src="/images/avatar/small/daniel.jpg" />
                    <div class="content">
                    <div class="header">Poodle</div>
                    A poodle, its pretty basic
                    </div>
                </div>
                <div class="item">
                    <img class="ui avatar image" src="/images/avatar/small/daniel.jpg" />
                    <div class="content">
                    <div class="header">Paulo</div>
                    He's also a dog
                    </div>
                </div>
                </div>
			<button type="submit" className="btn">to enter this chat(room)</button>
		</form>

    );
};



export default AllChats;