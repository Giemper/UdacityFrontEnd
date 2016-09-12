var bio = {
	"name": "Guillermo Magdaleno",
	"role": "Software Developer",
	"welcomeMessage": "Hello buddy",
	"contacts": {
		"mobile": "(686)555-5555",
		"email": "something@gmail.com",
		"github": "Giemper",
		"twitter": "Giemper",
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
		"description": "First projected submitted to Udacity",
		"images": ["images/Screenshot_1.png"]
	}, {
		"title": "Animal Trading Cards",
		"dates": "A few days ago",
		"description": "Second projected submitted to Udacity",
		"images": ["images/Screenshot_2.png"]
	}, {
		"title": "Build a Portfolio Site",
		"dates": "Yesterday",
		"description": "Third projected submitted to Udacity",
		"images": ["images/Screenshot_3.png"]
	}]
};

var education = {
	"schools": [{
		"name": "Cetys University",
		"location": "Mexicali, Baja California, Mexico",
		"degree": "Bachelor of Science in Engineering",
		"dates": "August 2011 - June 2015",
		"url": "http://cetys.mx",
		"majors": ["Computer Science"]
	}, {
		"name": "Ecole Polytechnique de Montreal",
		"location": "Montreal, Quebec, Canada",
		"degree": "Academic Exchange",
		"dates": "July 2014 - December 2014",
		"url": "http://polymtl.ca",
		"majors": ["Genie Logiciel"]
	}, {
		"name": "Stanford University",
		"location": "Stanford, California, United States",
		"degree": "2015 International Summer Program for Entrepeneurs",
		"dates": "August 2015",
		"url": "https://www.stanford.edu/",
		"majors": ["Summer Program in colaboration with the Consulate General of Mexico in Silicon Valley"]
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
	var formattedMobile = HTMLcontactGeneric.replace("%data%", bio.contacts.mobile).replace(
		"%contact%", '<span class="zocial-call"></span>');
	var formattedEmail = HTMLcontactGeneric.replace("%data%", bio.contacts.email).replace(
		"%contact%", '<span class="zocial-email"></span>');
	var formattedGithub = HTMLcontactGeneric.replace("%data%", bio.contacts.github).replace(
		"%contact%", '<span class="zocial-github"></span>');	
	var formattedTwitter = HTMLcontactGeneric.replace("%data%", bio.contacts.twitter).replace(
		"%contact%", '<span class="zocial-twitter"></span>');
	var formattedLocation = HTMLcontactGeneric.replace("%data%", bio.contacts.location).replace(
		"%contact%", '<span class="zocial-pinboard"></span>');
	var formattedBiopic = HTMLbioPic.replace("%data%", bio.biopic);
	var formattedWelcome = HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage);

	$("#header").prepend(formattedName, formattedRole);
	$("#topContacts").append(formattedMobile, formattedEmail,
		formattedGithub, formattedTwitter, formattedLocation);
	$("#header").append(formattedBiopic, formattedWelcome);
	$("#footerContacts").append(formattedMobile, formattedEmail,
		formattedGithub, formattedTwitter, formattedLocation);

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
		$(".work-entry:last").append(formattedEmployerTitle,
			formattedDates, formattedLocation, formattedDescription);
	});
};

projects.display = function () {
	projects.projects.forEach(function(project) {
		var formattedTitle = HTMLprojectTitle.replace("%data%", project.title);
		var formattedDates = HTMLprojectDates.replace("%data%", project.dates);
		var formattedDescription = HTMLprojectDescription.replace("%data%", project.description);

		$("#projects").append(HTMLprojectStart);
		$(".project-entry:last").append(formattedTitle,
			formattedDates, formattedDescription);

		project.images.forEach(function(img) {
			var formattedImage = HTMLprojectImage.replace("%data%", img);
			$(".project-entry:last").append(formattedImage);
		});
	});
};

education.display = function () {
	education.schools.forEach(function(school) {
		var formattedNameDegree = HTMLschoolName.replace("%data%", school.name).replace("#", school.url) + 
			HTMLschoolDegree.replace("%data%", school.degree);
		var formattedDates = HTMLschoolDates.replace("%data%", school.dates);
		var formattedLocation = HTMLschoolLocation.replace("%data%", school.location);

		$("#education").append(HTMLschoolStart);
		$(".education-entry:last").append(formattedNameDegree,
			formattedDates, formattedLocation);

		school.majors.forEach(function(major) {
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
		$(".education-entry:last").append(formattedTitleSchool,
			formattedDates, formattedURL);
	});
};

var rebooter = function() {
	$("#main").toggleClass("container");

	$("#workExperience").toggleClass("gray");
	$("#workExperience").after('<br><hr>');

	$("#projects").after('<br><hr>');

	$("#education").toggleClass("gray");
	$("#education").after('<br><hr>');

	$("#projects").toggleClass("row");
	$(".project-entry").each(function () {
		$(this).toggleClass("col-md-4");
	});

	$("#lets-connect").find("h2").remove();
};

bio.display();
work.display();
projects.display();
education.display();
maps.display();
rebooter();