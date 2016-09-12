var bio = {
	"name": "Guillermo Magdaleno",
	"role": "Software Developer",
	"welcomeMessage": "Hello buddy",
	"contacts": {
		"mobile": "(686)555-5555",
		"email": "something@gmail.com",
		"github": "https://github.com/Giemper",
		"twitter": "https://twitter.com/giemper",
		"location": "Mexicali"
	},
	"skills": ["Good at not coming up with info to fill here", "Bad at thinking about original messages at 12 am."],
	"biopic": "images/fry.jpg"
};

var work = {
	"jobs": [{
		"employer": "UTC Aerospace",
		"title": "Software Engineer",
		"location": "Mexicali",
		"dates": "1 Year",
		"description": "Currently doing code stuff."
	}, {
		"employer": "Honeywell Aerospace",
		"title": "Software Engineer",
		"location": "Mexicali",
		"dates": "4 Months",
		"description": "Used to code stuff."
	}]
};

var projects = {
	"projects": [{
		"title": "Mockup to Article",
		"dates": "A week ago",
		"description": "First projected submitted for revision in Udacity",
		"images": ["images/Screenshot_1.png"]
	}, {
		"title": "Animal Trading Cards",
		"dates": "A few days ago",
		"description": "Second projected submitted for revision in Udacity",
		"images": ["images/Screenshot_2.png"]
	}, {
		"title": "Build a Portfolio Site",
		"dates": "Yesterday",
		"description": "third projected submitted for revision in Udacity",
		"images": ["images/Screenshot_3.png"]
	}]
};

var education = {
	"school": [{
		"name": "Cetys University",
		"location": "Mexicali, Baja California, Mexico",
		"degree": "Bachelor of Science in Engineering",
		"degreeDates": "August 2011 - June 2015",
		"url": "http://cetys.mx",
		"major": ["Computer Science"]
	}, {
		"name": "Ecole Polytechnique de Montreal",
		"location": "Montreal, Quebec, Canada",
		"degree": "Academic Exchange",
		"degreeDates": "July 2014 - December 2014",
		"url": "http://polymtl.ca",
		"major": ["Genie Logiciel"]
	}, {
		"name": "Stanford University",
		"location": "Stanford, California, United States",
		"degree": "2015 International Summer Program for Entrepeneurs",
		"degreeDates": "August 2015",
		"url": "",
		"major": ["Summer Program in colaboration with the Consulate General of Mexico in Silicon Valley"]
	}],
	"onlineCourses": [{
		"title": "Front-End Nanodegree",
		"school": "Udacity",
		"dates": "Since August 21st",
		"url": "http://udacity.com"
	}]
};

var maps = {
	"display" : function () {
		$("#mapDiv").append(googleMap);
	}
};

bio.display = function () {
	var formattedName = HTMLheaderName.replace("%data%", bio.name);
	var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
	var formattedMobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
	var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
	var formattedGithub = HTMLgithub.replace("%data%", bio.contacts.github);
	var formattedTwitter = HTMLtwitter.replace("%data%", bio.contacts.twitter);
	var formattedLocation = HTMLlocation.replace("%data%", bio.contacts.location);
	var formattedBiopic = HTMLbioPic.replace("%data%", bio.biopic);
	var formattedWelcome = HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage);

	$("#header").prepend(formattedRole);
	$("#header").prepend(formattedName);
	$("#topContacts").append(formattedMobile);
	$("#topContacts").append(formattedEmail);
	$("#topContacts").append(formattedGithub);
	$("#topContacts").append(formattedTwitter);
	$("#topContacts").append(formattedLocation);
	$("#header").append(formattedBiopic);
	$("#header").append(formattedWelcome);

	$("#footerContacts").append(formattedMobile);
	$("#footerContacts").append(formattedEmail);
	$("#footerContacts").append(formattedGithub);
	$("#footerContacts").append(formattedTwitter);
	$("#footerContacts").append(formattedLocation);

	if(bio.skills.length > 1) {
		$("#header").append(HTMLskillsStart);
		bio.skills.forEach(function(skill) {
			var formattedSkills = HTMLskills.replace("%data%", skill);
			$("#skills").append(formattedSkills);
		});
	}
};

work.display = function () {
	work.jobs.forEach(function(job) {
		var formattedEmployerTitle = HTMLworkEmployer.replace("%data%", job.employer) + 
			HTMLworkTitle.replace("%data%", job.title);
		var formattedDates = HTMLworkDates.replace("%data%", job.dates);
		var formattedLocation = HTMLworkLocation.replace("%data%", job.location);
		var formattedDescription = HTMLworkDescription.replace("%data%", job.description);

		$("#workExperience").append(HTMLworkStart);	
		$(".work-entry:last").append(formattedEmployerTitle);
		$(".work-entry:last").append(formattedDates);
		$(".work-entry:last").append(formattedLocation);
		$(".work-entry:last").append(formattedDescription);
	});
};

projects.display = function () {
	projects.projects.forEach(function(project) {
		var formattedTitle = HTMLprojectTitle.replace("%data%", project.title);
		var formattedDates = HTMLprojectDates.replace("%data%", project.dates);
		var formattedDescription = HTMLprojectDescription.replace("%data%", project.description);

		$("#projects").append(HTMLprojectStart);
		$(".project-entry:last").append(formattedTitle);
		$(".project-entry:last").append(formattedDates);
		$(".project-entry:last").append(formattedDescription);

		project.images.forEach(function(img) {
			var formattedImage = HTMLprojectImage.replace("%data%", img);
			$(".project-entry:last").append(formattedImage);
		});
	});
};

education.display = function () {
	education.school.forEach(function(school) {
		var formattedNameDegree = HTMLschoolName.replace("%data%", school.name) + 
			HTMLschoolDegree.replace("%data%", school.degree);
		var formattedDates = HTMLschoolDates.replace("%data%", school.degreeDates);
		var formattedLocation = HTMLschoolLocation.replace("%data%", school.location);

		$("#education").append(HTMLschoolStart);
		$(".education-entry:last").append(formattedNameDegree);
		$(".education-entry:last").append(formattedDates);
		$(".education-entry:last").append(formattedLocation);

		school.major.forEach(function(major) {
			var formattedMajor = HTMLschoolMajor.replace("%data%", major);
			$(".education-entry:last").append(formattedMajor);
		});
	});
	$("#education").append(HTMLonlineClasses);
	education.onlineCourses.forEach(function(course) {
		var formattedTitleSchool = HTMLonlineTitle.replace("%data%", course.title) +
			HTMLonlineSchool.replace("%data%", course.school);
		var formattedDates = HTMLonlineDates.replace("%data%", course.dates);
		var formattedURL = HTMLonlineURL.replace("%data%", course.url);

		$("#education").append(HTMLschoolStart);
		$(".education-entry:last").append(formattedTitleSchool);
		$(".education-entry:last").append(formattedDates);
		$(".education-entry:last").append(formattedURL);
	});
};

bio.display();
work.display();
projects.display();
education.display();
maps.display();