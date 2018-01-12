import React, { Component } from 'react';

class Header extends Component 
{
	home = event =>
	{
		window.location="/"
	}
	render()
	{
		return (
		<div className = "container-fluid">	

						<div className="bgimg-1">
						<div className="container">
							<div className="row">
								<div className="col-md-12">
									<div className="caption">
										<span className="border">MIND OVER MOOD</span>
									</div>
									<div className="arrow">
									</div>
								</div>
							</div>
							</div>
						</div>


			
			<div className = "whatWeOffer">
				<h3>What we Offer</h3>
				<p>Have you ever had news, good or bad, that you wanted to tell but could not find the right person? Mind over Mood is a page designed for people that love to share. It is unique in that it is not geared towards a specific mood. Just got that big promotion at work? Share it in the happy room. Going through a tough time and need some advice on how to get through it? Talk about it in the sad room.  Are you going through something a little more personal and would prefer to talk to someone one on one? There’s a room for that too. If you are someone who prefers to listen rather than share, then the speaker listener chat was designed for you. All users are anonymous, so no personal information will be released in this judgement free zone.</p>
			</div>
			
			<div className="bgimg-2">
			</div>

			<div className = "why">
				<h3>Why it Works</h3>
    			<p>We are told from a young age not to talk to strangers. While that is great advice in many circumstances, it is not a perfect rule. Sometimes talking with the occasional stranger can have surprising benefits to your mental health and well-being. Studies have shown that people are more inclined to be honest and feel a sense of comfort when speaking anonymously. Whether this is due to not having close, supportive relationships or the topic of discussion involves the person normally gone to for a listening ear, anonymous conversations provide a sense of relief and security through any situation.</p>
			</div>

			<div className="bgimg-3">
			</div>

			<div className= "help">
					<h3>Additional Support</h3>
    				<p>If you or someone you love needs additional support, please reference the links below:<br></br><br></br>
						<div className="row text-left">
							<div className="col-md-4">
								<a href = "https://www.goodtherapy.org/">Find a Therapist</a><br></br>
								<a href = "https://suicidepreventionlifeline.org/">National Suicide Prevention Lifeline</a><br></br>
								<a href = "https://www.crisistextline.org/">Crisis Text Line</a><br></br>
							</div>
					
							<div className="col-md-4">	
								<a href = "https://www.samhsa.gov/find-help/national-helpline/">SAMHSA National Helpline</a><br></br>
								<a href = "https://www.psychologytoday.com/us/groups/">Find a Support Group</a><br></br>
								<a href = "https://www.mentalhelp.net/articles/treatment-when-to-seek-professional-help-and-where-to-find-help-for-major-depression/">Depression Guide</a><br></br>
							</div>

							<div className="col-md-4">
								<a href = "https://www.plannedparenthood.org/">Planned Parenthood</a><br></br>
								<a href = "https://www.rainn.org/">National Sexual Assult Hotline</a><br></br>
								<a href = "https://childrengrieve.org/">National Alliance for Grieving Children</a><br></br>
							</div>
						</div>
    				</p>
			</div>

			<div className="bgimg-4">
			</div>
		</div>
		
			
		);
	}
}

export default Header;